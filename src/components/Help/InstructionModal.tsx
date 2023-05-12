/** @format */

import * as React from 'react';
import { useEffect } from 'react';
import './InstructionModal.css';
import Modal from '@mui/material/Modal';

interface InstructionModalProps {
	open: boolean;
	handleClose: () => void;
	children: any;
}

const modalStyle = {
	position: 'absolute' as const,
	display: 'flex',
	// flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	height: '100vh',
	zIndex: 100,
};

const InstructionModal = ({
	open,
	handleClose,
	children,
}: InstructionModalProps) => {
	const [maskClass, setMaskClass] = React.useState('hide-mask');
	const [id, setId] = React.useState('');
	const [closed, setClosed] = React.useState(true);

	useEffect(() => {
		if (open) {
			setId('element-to-mask');
			setMaskClass('show-mask');
			setClosed(false);
		} else if (!closed) {
			setId('element-to-mask');
			setMaskClass('hide-mask');
			setTimeout(() => {
				setId('');
				setClosed(true);
			}, 400);
		}
	}, [open]);

	useEffect(() => {
		let timeOutId: NodeJS.Timeout | null = null;
		if (id === 'element-to-mask' && open) {
			timeOutId = setTimeout(() => {
				setId('');
			}, 400);
		}

		return () => {
			if (timeOutId) {
				clearTimeout(timeOutId);
			}
		};
	}, [id]);

	if (closed) return null;
	return (
		<Modal open={!closed} sx={modalStyle} onClose={handleClose}>
			{/* <div style={modalStyle}> */}
			<section id={id} className={`element ${maskClass}`}>
				{children}
			</section>
			{/* </div> */}
		</Modal>
	);
};

export default InstructionModal;
