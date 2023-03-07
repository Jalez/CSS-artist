/** @format */

import { Button } from '@mui/material';
import { useState } from 'react';
import { Diff } from './Diff/Diff';
import { Model } from './Model/Model';
import './ModelBoard.css';

export const ModelBoard = () => {
	const [showModel, setShowModel] = useState(true);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		console.log(event.currentTarget.innerText);
		if (event.currentTarget.innerText === 'MODEL') setShowModel(true);
		else setShowModel(false);
	};

	return (
		<div id='board'>
			{showModel ? <Model /> : <Diff />}

			<Button onClick={handleClick}>Model</Button>
			<Button onClick={handleClick}>Diff</Button>
		</div>
	);
};
