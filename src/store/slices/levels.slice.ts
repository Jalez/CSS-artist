/** @format */

import { createSlice } from '@reduxjs/toolkit';

const url = import.meta.env.LOCAL_TESTING_URL;

import confetti from 'canvas-confetti';
import { PremadeLevels } from '../../assets/PremadeLevels';
import { generateGridLevel } from '../../utils/generators/gridMaker';
import { flexboxMaker } from '../../utils/generators/flexboxMaker';
import { obfuscate } from '../../utils/obfuscators/obfuscate';
import Pixelmatch from 'pixelmatch';
import { Buffer } from 'buffer';

// Remove these static width and height values
const width = 400;
const height = 300;
const maxCodeLength = 100000;

// interface for initial state
interface Level {
	id: number;
	name: string;
	completed: string;
	accuracy: string;
	buildingBlocks?: {
		pictures?: Array<string>;
		colors?: Array<string>;
	};
	code: {
		html: string;
		css: string;
	};
	solution: {
		html: string;
		css: string;
	};
	image: string;
	diff: string;
	difficulty: string;
	points: number;
	maxPoints: number;
	help: {
		description: string;
		images: string[];
		usefullCSSProperties: string[];
	};
	drawingUrl: string;
	solutionUrl: string;
	drawnEvalUrl: string;
	solEvalUrl: string;
	confettiSprinkled: boolean;
}
const primaryColor = '#D4AF37';
const secondaryColor = '#222';
const initialHtml: string = `<div></div>`;
const initialCss: string = `body {
	margin: 0px;
	background-color: ${secondaryColor};
}
div {
	width: 100px;
	height: 50px;
	background-color: ${primaryColor};
}`;
interface InitialCode {
	html: string;
	css: string;
}

const initialCode: InitialCode = {
	html: initialHtml,
	css: initialCss,
};

const initialDefaults = {
	completed: 'no',
	accuracy: '0',
	code: initialCode,
	points: 0,
	maxPoints: 5,
	diff: '',
	drawingUrl: '',
	solutionUrl: '',
	drawnEvalUrl: '',
	solEvalUrl: '',
	solution: {
		html: '',
		css: '',
	},
	confettiSprinkled: false,
};
const storage = obfuscate('ui-designer-layout-levels');
const timerStorage = obfuscate('ui-designer-start-time');

// Get initial state from local storage
let initialState: Level[] = JSON.parse(storage.getItem(storage.key) || '[]');
// get current time in milliseconds
const currentTime = new Date().getTime();
// get the time the user started the game
const lastUpdated = timerStorage.getItem(timerStorage.key);
// if the user started the game more than 12 hours ago, reset the state
const twhours = 43200000;
// for testing purposes, set the time to 1 second
// const twhours = 1000;
if (lastUpdated && currentTime - parseInt(lastUpdated) > twhours) {
	initialState = [];
	timerStorage.setItem(timerStorage.key, currentTime.toString());
} else if (!lastUpdated) {
	timerStorage.setItem(timerStorage.key, currentTime.toString());
}

// if there is no initial state, set it to the default state
if (initialState.length === 0) {
	console.log("There's no initial state, setting it to default state");
	initialState = [...PremadeLevels];

	const createLevels = () => {
		for (let i = 1; i <= 2; i++) {
			let randomLevel = {
				image: '',
				colors: ['#fff'],
				pictures: [],
			};
			let difficulty = i === 1 ? 'Task 1' : 2 === 2 ? 'Task 2' : 'Task 3';

			// // If the level is 1, get random easy level and set difficulty to easy
			// if (i === 1) {
			// 	randomLevel = levels[i][Math.floor(Math.random() * levels[i].length)];
			// 	difficulty = 1 === 1 ? 'easy' : 2 === 2 ? 'medium' : 'hard';
			// }

			let generatedLevelDetails;
			// If the level is one, lets give them flexbox
			if (i === 1) {
				generatedLevelDetails = flexboxMaker(primaryColor, secondaryColor);
			}
			// if the level is 2, lets give them grid
			else {
				generatedLevelDetails = generateGridLevel(primaryColor, secondaryColor);
			}

			const level = {
				id: i,
				name: `Level ${i}`,

				buildingBlocks: {
					pictures: randomLevel.pictures,
					colors: [primaryColor, secondaryColor],
				},
				...initialDefaults,
				code: {
					html: generatedLevelDetails.HTML,
					css: generatedLevelDetails.TCSS,
				},
				image: '',
				difficulty,
				help: {
					description: 'NO help available',
					images: [],
					usefullCSSProperties: [],
				},
				solution: {
					html: generatedLevelDetails.HTML,
					css: generatedLevelDetails.SCSS + generatedLevelDetails.TCSS,
				},
			};
			initialState.push(level);
		}
	};

	// createLevels();
} else {
	// if there is an initial state, set the code to the initial code
	initialState.forEach((level) => {
		level.points = 0;
		level.accuracy = '0';
	});
}

const levelsSlice = createSlice({
	name: 'levels',
	initialState: initialState as Level[],

	reducers: {
		evaluateLevel(state, action) {
			const getPixelData = (img = new Image()) => {
				// return new Promise((resolve, reject) => {
				// Create a canvas element
				const canvas = document.createElement('canvas');
				// Set the width and height of the canvas to the width and height of the image
				canvas.width = img.width;
				canvas.height = img.height;
				// Get the 2D context of the canvas
				const ctx = canvas.getContext('2d');
				// Draw the image on the canvas
				ctx?.drawImage(img, 0, 0);
				// Get the image data from the canvas
				const imgData = ctx?.getImageData(0, 0, 400, 300);
				// Resolve the promise with the image data
				return imgData;
				// });
			};
			// get the image urls from the current level

			const loadAndMatch = (
				currentLevel: Number,
				drawnImage: HTMLImageElement,
				solutionImage: HTMLImageElement
			) => {
				// console.log('COMPARING IMAGES: ', level?.solutionUrl, level?.drawingUrl);
				// set the src of the image to the data url
				const img1Data = getPixelData(drawnImage) as ImageData;
				const img2Data = getPixelData(solutionImage) as ImageData;

				// Create a diff image with the same dimensions as img1
				const diff = Buffer.alloc(img2Data.data.length as number) as Buffer;
				const width = img1Data?.width;
				const height = img1Data?.height;
				const accuracy = Pixelmatch(
					img2Data?.data,
					img1Data?.data,
					diff,
					width,
					height,
					{
						threshold: 0.1,
					}
				);
				// Update the current level with the accuracy and diff
				const level = state.find((level) => level.id === currentLevel);
				if (!level) return;
				const percentage = 100 - (accuracy / (width * height)) * 100;
				level.diff = diff.toString('base64');
				level.accuracy = percentage.toFixed(2);

				// if percentage is over 90, use confetti
				if (percentage > 90) {
					if (percentage > 98 && !level.confettiSprinkled) {
						confetti({ particleCount: 100 });
						level.confettiSprinkled = true;
					}
					// Calculate the points based on the last 10 percent
					const lastTenPercent = percentage - 90;
					const lastTenPercentPercentage = lastTenPercent / 10;
					level.points = Math.ceil(lastTenPercentPercentage * level.maxPoints);
					// set level completed to yes
					level.completed = 'yes';
				}
				// If percentage is less than 90, set points to 0
				else {
					level.points = 0;
				}

				storage.setItem(storage.key, JSON.stringify(state));
			};
			// allImagesLoaded();
			const { currentLevel, drawnImage, solutionImage } = action.payload;
			loadAndMatch(currentLevel, drawnImage, solutionImage);
		},
		resetCode(state, action) {
			const { id, lang } = action.payload;
			const level = state.find((level) => level.id === id);
			if (!level) return;

			// Add type assertion to ensure correct indexing
			const updatedCodeLanguage = lang as keyof InitialCode;
			level.code[updatedCodeLanguage] = initialCode[updatedCodeLanguage];
			console.log('RESET CODE: ', level.code[updatedCodeLanguage]);
			storage.setItem(storage.key, JSON.stringify(state));
		},
		updateCode(state, action) {
			const { id, code } = action.payload;
			const level = state.find((level) => level.id === id);
			if (
				(code.html && code.html.length > maxCodeLength) ||
				(code.css && code.css.length > maxCodeLength)
			) {
				console.log('Code is too long!');
				return;
			}

			if (code.css.includes(level?.image) || code.html.includes(level?.image)) {
				console.log("Using the solutions own image url isn't allowed!");
				return;
			}

			// cant include "script" in code
			if (code.html.includes('script')) {
				console.log("Using scripts isn't allowed!");
				return;
			}

			if (!level) return;
			level.code = code;
			// update the code for the level in local storage
			storage.setItem(storage.key, JSON.stringify(state));
		},
		updateSolution(state, action) {
			const { id, solution } = action.payload;
			const level = state.find((level) => level.id === id);
			if (!level) return;
			// level.solution = solution;
			// update the code for the level in local storage
			storage.setItem(storage.key, JSON.stringify(state));
		},
		updateUrl(state, action) {
			if (!action.payload) return;

			// console.log('UPDATING URL with payload: ', action.payload);

			const { id, dataURL, urlName } = action.payload;
			if (urlName === 'drawingUrl') state[id - 1].drawingUrl = dataURL;
			else if (urlName === 'solutionUrl') {
				state[id - 1].solutionUrl = dataURL;
				// set image
				state[id - 1].image = dataURL;
				// Remove solution code from state if it exists
				if (state[id - 1].solution.css) state[id - 1].solution.css = '';
				if (state[id - 1].solution.html) state[id - 1].solution.html = '';
			}
			// update the code for the level in local storage
			storage.setItem(storage.key, JSON.stringify(state));
		},
		updateEvaluationUrl(state, action) {
			const { id, dataUrl, name } = action.payload;
			if (name === 'drawing') state[id - 1].drawnEvalUrl = dataUrl;
			if (name === 'solution') state[id - 1].solEvalUrl = dataUrl;

			// update the code for the level in local storage
			storage.setItem(storage.key, JSON.stringify(state));
		},
	},
});

export const {
	updateCode,
	updateUrl,
	updateEvaluationUrl,
	evaluateLevel,
	resetCode,
} = levelsSlice.actions;

export default levelsSlice.reducer;
