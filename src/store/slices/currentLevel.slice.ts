/** @format */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentLevelState {
	currentLevel: number;
}

const initialState: CurrentLevelState = {
	currentLevel: 1,
};

const currentLevelSlice = createSlice({
	name: 'currentLevel',
	initialState,
	reducers: {
		setCurrentLevel(state, action: PayloadAction<number>) {
			state.currentLevel = action.payload;
		},
	},
});

export const { setCurrentLevel } = currentLevelSlice.actions;

export default currentLevelSlice.reducer;
