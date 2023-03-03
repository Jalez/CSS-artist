/** @format */

import { scoreTypes } from '../constants/score.actions.js';

const updateScore = (score) => {
	return {
		type: scoreTypes.update,
		payload: score,
	};
};
