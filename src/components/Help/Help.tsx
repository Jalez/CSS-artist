/** @format */

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { NavButton } from '../Navbar/NavButton';
import { HelpContent } from './HelpContent';

export default function Help() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<NavButton clickHandler={handleOpen}>Help</NavButton>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='help-modal-title'
				aria-describedby='help-modal-description'>
				<HelpContent />
			</Modal>
		</>
	);
}
