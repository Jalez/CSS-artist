/** @format */

import { useSelector } from 'react-redux/es/exports';


export const Model = () => {
	const { currentLevel } = useSelector((state: any) => state.currentLevel);
	const levelDetails = useSelector((state: any) => state.levels[currentLevel - 1]);
	return (
		<div id='model' style={{}}>
			<img
				src={levelDetails.image}
				alt='
			The image that the user will draw a copy of
			'
				id='img2'
			/>
		</div>
	);
};
