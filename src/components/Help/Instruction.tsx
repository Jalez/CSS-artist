/** @format */

import * as React from 'react';
import { Button } from '@mui/material';

import { Title } from '../Title/Title';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { updateRoom } from '../../store/slices/room.slice';
import { useEffect } from 'react';
import InstructionModal from './InstructionModal';
import InstructionTabs from './InstructionTabs';
import InstructionPaper from './InstructionPaper';
import InstructionContentContainer from './InstructionContentContainer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InstructionButton from './InstructionButton';

export default function Instruction() {
	const [open, setOpen] = React.useState(false);

	const dispatch = useAppDispatch();
	const room = useAppSelector((state) => state.room);

	useEffect(() => {
		if (room.currentRoom === 'Instruction') {
			setOpen(true);
		}
	}, [room.currentRoom]);

	const handleClose = () => {
		setOpen(false);
		dispatch(updateRoom('game'));
	};

	return (
		<InstructionModal open={open} handleClose={handleClose}>
			<InstructionPaper>
				<Title />
				<InstructionButton handleClose={handleClose} />
				<InstructionContentContainer>
					<InstructionTabs />
				</InstructionContentContainer>
			</InstructionPaper>
		</InstructionModal>
	);
}
