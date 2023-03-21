/** @format */

import { createSlice } from '@reduxjs/toolkit';

// Get from assets
import Easy1 from '../../assets/Easy1.png';
import Easy2 from '../../assets/Easy2.png';
import Medium2 from '../../assets/Medium2.png';
import Hard3 from '../../assets/Hard3.png';

import confetti from 'canvas-confetti';

// Remove these static width and height values
const width = 400;
const height = 300;

// interface for initial state
interface Level {
	id: number;
	name: string;
	completed: string;
	accuracy: string;
	primaryColor: string;
	secondaryColor: string;
	code: {
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
}

const initialHtml: string = `<div></div>`;
const initialCss: string = `
body {
	margin: 0px;
	background-color: #222;
}
div {
	width: 100px;
	height: 100px;
	background-color: yellow;
}`;
const initialCode = {
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
};
// Get initial state from local storage
let initialState: Level[] = JSON.parse(
	localStorage.getItem('css-artist-1-levels') || '[]'
);
console.log('initialState', initialState);
// if there is no initial state, set it to the default state
if (initialState.length === 0) {
	console.log("There's no initial state, setting it to default state");
	initialState = [
		{
			id: 1,
			name: 'Level 1',
			primaryColor: '#B5E0BA',
			secondaryColor: '#5D3A3A',
			...initialDefaults,
			image: Easy1,
			difficulty: 'easy 1',
			help: {
				description: 'This is the first level',
				images: [],
				usefullCSSProperties: [],
			},
		},
		{
			id: 2,
			name: 'Level 2',
			primaryColor: '#62374E',
			secondaryColor: '#FDC57B',
			...initialDefaults,
			image: Easy2,
			difficulty: 'easy 2',
			help: {
				description: 'This is the first level',
				images: [],
				usefullCSSProperties: [],
			},
		},
		{
			id: 3,
			name: 'Level 3',
			primaryColor: '#D25B70',
			secondaryColor: '#F2E09F',
			...initialDefaults,
			image: Medium2,
			difficulty: 'medium',
			help: {
				description: 'This is the second level',
				images: [],
				usefullCSSProperties: [],
			},
		},
		{
			id: 4,
			name: 'Level 4',
			primaryColor: '#F5D6B4',
			secondaryColor: '#D86F45',
			...initialDefaults,
			image: Hard3,
			difficulty: 'hard',
			help: {
				description: 'This is the third level',
				images: [],
				usefullCSSProperties: [],
			},
		},
	];
} else {
	// if there is an initial state, set the code to the initial code
	initialState.forEach((level) => {
		level.points = 0;
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
			console.log('percentage', percentage);
			if (percentage > 90) {
				confetti({
					particleCount: 100,
				});
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
			if (!level) return;
			level.code = code;
			// update the code for the level in local storage
			localStorage.setItem('css-artist-1-levels', JSON.stringify(state));
		},
	},
});

export const { updateLevel, updateCode } = levelsSlice.actions;

export default levelsSlice.reducer;
