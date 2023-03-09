/** @format */

import { Popover } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const InfoColor = (
	{
		significance = "primaryColor",
	}
) => {
	const [popUp, setPopUp] = useState(false);
	const colorRef = useRef<HTMLParagraphElement>(null);
	// Get the color code from the state

	// get the current level from the store state
	const { currentLevel } = useSelector((state: any) => state.currentLevel);
	const levelDetails = useSelector((state: any) => state.levels[currentLevel - 1]);
	useEffect(() => {
		if (popUp) {
			setTimeout(() => {
				setPopUp(false);
			}, 500);
		}
	}, [popUp]);





	let colorCode = "yellow";
	colorCode = levelDetails[significance];

	const clickHandler = (
		event: React.MouseEvent<HTMLParagraphElement, MouseEvent>
	) => {
		// When the p is clicked, copy the color code to the clipboard
		navigator.clipboard.writeText('#FF0000');
		// alert the user that the color code has been copied
		// alert('Copied to clipboard');
		setPopUp(true);
	};

	return (
		<div
			style={{
				width: '100%',
			}}>
			<Popover
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				anchorEl={colorRef.current}
				open={popUp}>
				<p
					style={{
						margin: '10px',
					}}>
					Copied to the clipboard
				</p>
			</Popover>
			<div
				ref={colorRef}
				onClick={clickHandler}
				style={{
					// make p display box
					display: 'flex',

					alignItems: 'center',
				}}>
				<div
					className='color-box'
					style={{
						backgroundColor: colorCode,
						height: '20px',
						width: '20px',
						borderRadius: '50%',
						border: '2px solid black',
						// Dont allow the user to select the color box
						userSelect: 'none',
					}}></div>
				<span
					style={{
						userSelect: 'none',
					}}
				>

					{colorCode}
				</span>
			</div>
		</div>
	);
};
