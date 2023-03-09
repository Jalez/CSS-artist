/** @format */

import { Button, FormControlLabel, Switch } from '@mui/material';
import { useState } from 'react';
import { InfoBoard } from '../../InfoBoard/InfoBoard';
import { InfoColor } from '../../InfoBoard/InfoColor';
import { Diff } from './Diff/Diff';
import { Model } from './Model/Model';
import './ModelBoard.css';

export const ModelBoard = () => {
	const [showModel, setShowModel] = useState(true);

	return (
		<div id='model-board'>
			<InfoBoard>
				<InfoColor />
				<FormControlLabel
					control={
						<Switch
							style={{ color: 'white', fontSize: '1.5em', font: 'Kontakt' }}
							defaultChecked
							// fire when switch is clicked
							onChange={() => setShowModel(!showModel)}
						/>
					}
					style={{ color: 'white' }}
					label={showModel ? 'Show Diff' : 'Show Model'}
				/>
			</InfoBoard>
			<div
				className='img-container'
				style={{
					height: '300px',
				}}>
				{showModel ? <Model /> : <Diff />}
			</div>
		</div>
	);
};
