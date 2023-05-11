/** @format */

import { createSlice } from '@reduxjs/toolkit';

// Get from assets

const url = import.meta.env.LOCAL_TESTING_URL;

import confetti from 'canvas-confetti';
import { PremadeLevels } from '../../assets/PremadeLevels';

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
	// solution: {
	// 	html: string;
	// 	css: string;
	// };
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
}

// Get initial state from local storage
let initialState: Level[] = JSON.parse(
	localStorage.getItem('css-artist-1-levels') || '[]'
);
// if there is no initial state, set it to the default state
if (initialState.length === 0) {
	console.log("There's no initial state, setting it to default state");
	initialState = [...PremadeLevels];
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
		updateLevel(state, action) {
			const { id, accuracy, diff } = action.payload;
			const level = state.find((level) => level.id === id);
			if (!level) return;
			level.accuracy = accuracy;
			// Get the percentage of pixels that are different
			let percentage = 100 - (accuracy / (width * height)) * 100;

			// if percentage is over 90, use confetti
			if (percentage > 90) {
				if (percentage > 98) confetti({ particleCount: 100 });
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

			// Round the percentage to 2 decimal places
			level.accuracy = percentage.toFixed(2);
			level.diff = diff;
			// update the level in local storage
			localStorage.setItem('css-artist-1-levels', JSON.stringify(state));
		},
		updateCode(state, action) {
			const { id, code } = action.payload;
			const level = state.find((level) => level.id === id);
			// check that code doesnt contain level solution in it
			//check if html or css length is over 100000, do nothing
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
			localStorage.setItem('css-artist-1-levels', JSON.stringify(state));
		},
		updateSolution(state, action) {
			const { id, solution } = action.payload;
			const level = state.find((level) => level.id === id);
			if (!level) return;
			// level.solution = solution;
			// update the code for the level in local storage
			localStorage.setItem('css-artist-1-levels', JSON.stringify(state));
		},
		updateUrl(state, action) {
			if (!action.payload) return;

			const { id, dataURL, name } = action.payload;
			if (name === 'drawing') state[id - 1].drawingUrl = dataURL;
			else if (name === 'solution') state[id - 1].solutionUrl = dataURL;
			// update the code for the level in local storage
			localStorage.setItem('css-artist-1-levels', JSON.stringify(state));
		},
		updateEvaluationUrl(state, action) {
			const { id, dataUrl, name } = action.payload;
			if (name === 'drawing') state[id - 1].drawnEvalUrl = dataUrl;
			if (name === 'solution') state[id - 1].solEvalUrl = dataUrl;

			// update the code for the level in local storage
			localStorage.setItem('css-artist-1-levels', JSON.stringify(state));
		},
	},
});

export const { updateLevel, updateCode, updateUrl, updateEvaluationUrl } =
	levelsSlice.actions;

export default levelsSlice.reducer;
