/** @format */

// import { useState } from 'react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux/es/exports';
import Easy2 from '../../../../assets/Easy2.png';
import Hard3 from '../../../../assets/Hard3.png';
import Medium2 from '../../../../assets/Medium2.png';

const levelModels = [
	{
		id: 1,
		name: 'Easy',
		model: Easy2,
	},
	{
		id: 2,
		name: 'Medium',
		model: Medium2,
	},
	{
		id: 3,
		name: 'Hard',
		model: Hard3,
	},
];

export const Model = () => {
	// Get current level from store
	const { currentLevel } = useSelector((state: any) => state.currentLevel);
	// Get the model for the current level from the array with useMemo
	const currentModel = useMemo(() => {
		const model = levelModels.find((level) => {
			console.log('level.id: ', level.id);
			console.log('currentLevel: ', currentLevel);
			return level.id === currentLevel;
		});

		if (model) {
			console.log('found model: ', model.id);
			return model.model;
		} else {
			console.log('no model found');
			return levelModels[0].model;
		}
	}, [currentLevel]);

	return (
		<div id='model' style={{}}>
			<img
				src={currentModel}
				alt='
			The image that the user will draw a copy of
			'
				id='img2'
			/>
		</div>
	);
};
