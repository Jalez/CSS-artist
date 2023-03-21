/** @format */

import { scoreTypes } from '../constants/score.actions.js';
import { AppThunk } from '../store.js';

const updatePoints = (points = 0) => {
	return {
		type: scoreTypes.updatePoints,
		payload: points,
	};
};

const updateMaxPoints = (maxPoints = 0) => {
	return {
		type: scoreTypes.updateMaxPoints,
		payload: maxPoints,
	};
};

// Create a thunk action creator that returns a function that accepts dispatch as an argument
export const updatePointsThunk =
	(accuracy: number): AppThunk =>
	async (dispatch, getState) => {
		{
			// Get current level from store
			const { currentLevel } = getState().currentLevel;
			// Get all levels from store
			const levels = getState().levels;
			// Get current score from store
			const score = getState().score;

			// Get current level from levels
			const currentLevelData = levels[currentLevel - 1];
			// max points of the current level is 5
			const currentLevelMaxPoints = 5;
			// Calculate points based on accuracy
			const points = Math.floor(accuracy * currentLevelMaxPoints);
			// Remove old points from score
			const newScore = score.points - currentLevelData.points;
			// Add new points to score
			const updatedPoints = newScore + points;
			// Dispatch the thunk action
			dispatch(updatePoints(updatedPoints));
			dispatch(sendScoreToParentFrame());
		}
	};

export const sendScoreToParentFrame = (): AppThunk => (dispatch, getState) => {
	// Get score from store
	const score = getState().score;
	// Send score to parent frame
	window.parent.postMessage(score, '*');
};
