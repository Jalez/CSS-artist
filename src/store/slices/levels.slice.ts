/** @format */

import { createSlice } from '@reduxjs/toolkit';

// Get from assets
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
	image: string;
	diff: string;
	difficulty: string;
	points: number;
	help: {
		description: string;
		images: string[];
		usefullCSSProperties: string[];
	};
}

const levelsSlice = createSlice({
	name: 'levels',
	initialState: [
		{
			id: 1,
			name: 'Level 1',
			completed: 'no',
			accuracy: '0',
			primaryColor: '#62374E',
			secondaryColor: '#FDC57B',
			image: Easy2,
			points: 0,
			diff: '',
			difficulty: 'easy',
			help: {
				description: 'This is the first level',
				images: [],
				usefullCSSProperties: [],
			},
		},
		{
			id: 2,
			name: 'Level 2',
			completed: 'no',
			accuracy: '0',
			primaryColor: '#D25B70',
			secondaryColor: '#F2E09F',
			image: Medium2,
			points: 0,
			diff: '',
			difficulty: 'medium',
			help: {
				description: 'This is the second level',
				images: [],
				usefullCSSProperties: [],
			},
		},
		{
			id: 3,
			name: 'Level 3',
			completed: 'no',
			accuracy: '0',
			primaryColor: '#F5D6B4',
			secondaryColor: '#D86F45',
			points: 0,
			image: Hard3,
			diff: '',
			difficulty: 'hard',
			help: {
				description: 'This is the third level',
				images: [],
				usefullCSSProperties: [],
			},
		},
	] as Level[],

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
				confetti({
					particleCount: 100,
				});

				// set level completed to yes
				level.completed = 'yes';
			}

			// Round the percentage to 2 decimal places
			level.accuracy = percentage.toFixed(2);
			level.diff = diff;
		},
		evaluator(
			state,
			action: {
				type: string;
				payload: { id: number; newDrawing: string };
			}
		) {
			const { id, newDrawing } = action.payload;
			// Get the currentLevel from the stores state
			const level = state.find((level) => level.id === id);
			// if level is undefined, return
			if (!level) return;
			// get the imge
		},
	},
});

export const { updateLevel } = levelsSlice.actions;

export default levelsSlice.reducer;
