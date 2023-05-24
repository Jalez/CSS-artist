/** @format */

import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';

import { Box, Button, Typography } from '@mui/material';

interface EditorHeadingProps {
	title: string;
	locked?: boolean;
}

export const EditorHeading = ({
	title = 'Code editor',
	locked = false,
}: EditorHeadingProps) => {
	const dispatch = useAppDispatch();
	const currentLevel = useAppSelector(
		(state) => state.currentLevel.currentLevel
	);

	return (
		<div
			style={{
				borderBottom: '3px solid #111',
				padding: '0.5em',
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
			}}>
			<Typography
				variant='h3'
				// Make it h2

				color='primary'
				id='title'>
				{title} {locked ? '(Locked)' : ''}
			</Typography>
			<Button
				onClick={() => {
					dispatch(resetCode({ id: currentLevel, lang: title.toLowerCase() }));
				}}>
				Reset {title}
			</Button>
		</div>
	);
};
