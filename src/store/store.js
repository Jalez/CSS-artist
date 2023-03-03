/** @format */

import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	score: scoreReducer,
});
