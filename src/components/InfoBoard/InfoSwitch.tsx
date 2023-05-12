/** @format */

import { FormControlLabel, Switch, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { updateModelBoard } from '../../store/slices/board.slice';

interface InfoSwitchProps {}

export const InfoSwitch = ({}: InfoSwitchProps) => {
	const modelBoard = useAppSelector((state) => state.board.modelBoard);
	const dispatch = useAppDispatch();

	return (
		<FormControlLabel
			control={
				<Switch
					// Change color to #D4AF37
					color='primary'
					checked={modelBoard === 'model' ? true : false}
					// fire when switch is clicked
					onChange={() =>
						dispatch(
							updateModelBoard(modelBoard === 'model' ? 'diff' : 'model')
						)
					}
				/>
			}
			style={{
				userSelect: 'none',
				// color: '#D4AF37',
			}}
			label={<Typography variant='body1'>{modelBoard}</Typography>}
			labelPlacement='start'
		/>
	);
};
