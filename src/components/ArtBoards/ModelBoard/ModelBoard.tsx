/** @format */

import { Button, FormControlLabel, Switch, Typography } from '@mui/material';
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
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
					}}>
					<InfoColor significance='primaryColor' />
					<InfoColor significance='secondaryColor' />
				</div>
				<FormControlLabel
					control={
						<Switch
							defaultChecked
							// fire when switch is clicked
							onChange={() => setShowModel(!showModel)}
						/>
					}
					style={{
						userSelect: 'none',
					}}
					label={
						<Typography
							style={{
								font: 'Kontakt',
								// dont allow text selection
							}}
							variant='p'>
							{showModel ? 'Model' : 'Diff'}
						</Typography>
					}
					labelPlacement='start'
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
