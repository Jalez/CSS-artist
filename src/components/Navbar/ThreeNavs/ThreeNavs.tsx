/** @format */

import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { setCurrentLevel } from '../../../store/slices/currentLevel.slice';
import HelpModal from '../../Help/Help';
import { NavButton } from '../NavButton';
import NavMenu from '../NavMenu';

import './ThreeNavs.css';

const levelsAndIds = [
	{
		id: 1,
		name: 'Easy',
	},
	{
		id: 2,
		name: 'Medium',
	},
	{
		id: 3,
		name: 'Hard',
	},
];

export const ThreeNavs = () => {
	const dispatch = useDispatch();
	const beginEvaluation = () => {
		// send a message to the iframe
		const iframe = document.querySelector('iframe');

		if (iframe) {
			iframe.contentWindow?.postMessage('create image', '*');
		}
	};

	const levelChanger = (pickedLevel: any) => {
		const level = levelsAndIds.find((level) => level.name === pickedLevel);
		if (level) {
			// dispatch the levels id to the store as the current level
			dispatch(setCurrentLevel(level.id));
		}
	};

	return (
		<div id='three-navs'>
			<HelpModal />

			<NavButton clickHandler={beginEvaluation}>Evaluate</NavButton>
			<NavMenu
				clickHandler={levelChanger}
				menuItems={['Easy', 'Medium', 'Hard']}>
				Levels
			</NavMenu>
		</div>
	);
};
