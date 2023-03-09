/** @format */

import { Popover } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export const InfoColor = () => {
	const [popUp, setPopUp] = useState(false);
	const colorRef = useRef<HTMLParagraphElement>(null);

	useEffect(() => {
		if (popUp) {
			setTimeout(() => {
				setPopUp(false);
			}, 500);
		}
	}, [popUp]);

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
			<p
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
						backgroundColor: 'red',
						height: '20px',
						width: '20px',
						borderRadius: '50%',
						border: '2px solid black',
					}}></div>
				#FF0000
			</p>
		</div>
	);
};
