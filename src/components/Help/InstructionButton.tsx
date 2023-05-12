/** @format */

import { Button } from '@mui/material';

interface InstructionButtonProps {
	handleClose: () => void;
}

const InstructionButton = ({ handleClose }: InstructionButtonProps) => {
	return (
		<div
			style={{
				position: 'absolute',
				display: 'flex',
				justifyContent: 'center',
				padding: 20,
				zIndex: 100,
				right: '0',
			}}>
			<Button onClick={handleClose} variant='contained'>
				<strong>To the tasks</strong>
			</Button>
		</div>
	);
};

export default InstructionButton;
