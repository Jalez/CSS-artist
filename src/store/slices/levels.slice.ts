/** @format */

import { createSlice } from '@reduxjs/toolkit';

// Get from assets
import Easy2 from '../../assets/Easy2.png';
import Medium2 from '../../assets/Medium2.png';
import Hard3 from '../../assets/Hard3.png';

const levelsSlice = createSlice({
	name: 'levels',
	initialState: [
		{
			id: 1,
			name: 'Level 1',
			completed: 'no',
			accuracy: 0,
			primaryColor: '#62374E',
			secondaryColor: '#FDC57B',
			image: Easy2,
			difficulty: 'easy',
		},
		{
			id: 2,
			name: 'Level 2',
			completed: 'no',
			accuracy: 0,
			primaryColor: '#D25B70',
			secondaryColor: '#F2E09F',
			image: Medium2,
			difficulty: 'medium',
		},
		{
			id: 3,
			name: 'Level 3',
			completed: 'no',
			accuracy: 0,
			primaryColor: '#F5D6B4',
			secondaryColor: '#D86F45',
			image: Hard3,
			difficulty: 'hard',
		},
	],

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

			const level = state.find((level) => level.id === action.payload);
			if (level) level.completed = 'yes';
		},
	},
});

export const { completeLevel } = levelsSlice.actions;

export default levelsSlice.reducer;
