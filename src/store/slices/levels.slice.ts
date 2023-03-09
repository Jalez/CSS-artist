/** @format */

import { createSlice } from '@reduxjs/toolkit';

const levelsSlice = createSlice({
	name: 'levels',
	initialState: {
		levels: [
			{
				id: 1,
				name: 'Level 1',
				image: 'https://i.imgur.com/9J4ZQ9M.png',
				completed: false,
			},
			{
				id: 2,
				name: 'Level 2',
				image: 'https://i.imgur.com/9J4ZQ9M.png',
				completed: false,
			},
			{
				id: 3,
				name: 'Level 3',
				image: 'https://i.imgur.com/9J4ZQ9M.png',
				completed: false,
			},
		],
	},
	reducers: {
		completeLevel(
			state,
			action: {
				type: string;
				payload: number;
			}
		) {
			// Get the currentLevel from the stores state
			console.log('state', state);

			const level = state.levels.find((level) => level.id === action.payload);
			if (level) level.completed = true;
		},
	},
});

export const { completeLevel } = levelsSlice.actions;

export default levelsSlice.reducer;
