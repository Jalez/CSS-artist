/** @format */

import { configureStore } from '@reduxjs/toolkit';
import levelsReducer from './slices/levels.slice';
import currentLevelReducer from './slices/currentLevel.slice';

export const store = configureStore({
	reducer: {
		levels: levelsReducer,
		currentLevel: currentLevelReducer,
	},
});
