/** @format */

import { createSlice } from '@reduxjs/toolkit';

const boardSlice = createSlice({
	name: 'board',
	initialState: {
		drawBoard: 'drawing',
		modelBoard: 'model', //Could be "model" or "diff"
	},
	reducers: {
		updateDrawBoard: (state, action) => {
			state.drawBoard = action.payload;
		},
		updateModelBoard: (state, action) => {
			state.modelBoard = action.payload;
		},
	},
});

export const { updateDrawBoard, updateModelBoard } = boardSlice.actions;

export default boardSlice.reducer;
