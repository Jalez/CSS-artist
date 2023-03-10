/** @format */

import { useSelector } from 'react-redux';

// create prop interface
interface NavTextProps {
	children: any;
	reduxState: any;
}

export const InfoText = ({ children, reduxState }: NavTextProps) => {
	// get redux state
	const { currentLevel } = useSelector((state: any) => state.currentLevel);
	const detail = useSelector(
		(state: any) => state.levels[currentLevel - 1][reduxState]
	);

	console.log('currentLevel: ', currentLevel);
	console.log(detail);
	return (
		<>
			<p
				style={{
					textAlign: 'center',
				}}>
				{children} : {detail}
			</p>
		</>
	);
};
