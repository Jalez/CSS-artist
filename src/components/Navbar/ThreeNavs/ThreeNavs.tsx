/** @format */

import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { setCurrentLevel } from '../../../store/slices/currentLevel.slice';
import HelpModal from '../../Help/Help';
import { NavButton } from '../NavButton';
import NavMenu from '../NavMenu';

import { sendScoreToParentFrame } from '../../../store/actions/score.actions';

import './ThreeNavs.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';

export const ThreeNavs = () => {
	const dispatch = useAppDispatch();
	const levels = useAppSelector((state) => state.levels);

	// get difficulties in an array from the levels
	const difficulties = levels.map((level) => level.difficulty);

	const beginEvaluation = () => {
		// send a message to the iframe
		const iframe = document.querySelector('iframe');

		if (iframe) {
			iframe.contentWindow?.postMessage('create image', '*');
		}
		dispatch(sendScoreToParentFrame());
	};

	const levelChanger = (pickedLevel: any) => {
		// get the level object from the levels array
		const level = levels.find((level) => level.difficulty === pickedLevel);
		if (level) {
			// dispatch the levels id to the store as the current level
			dispatch(setCurrentLevel(level.id));
		}
	};

	return (
		<div id='three-navs'>
			<HelpModal />
			<NavButton clickHandler={beginEvaluation}>Evaluate</NavButton>
			<NavMenu clickHandler={levelChanger} menuItems={difficulties}>
				Levels
			</NavMenu>
		</div>
	);
};
