/** @format */

import { Button } from '@mui/material';
import './LeftNav.css';

export const LeftNav = () => {
	const clickHandler = () => {
		// send a message to the iframe
		const iframe = document.querySelector('iframe');

		if (iframe) {
			iframe.contentWindow?.postMessage('create image', '*');
		}
	};

	return (
		<div id='left-nav'>
			<Button
				style={{
					fontSize: 20,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
				}}>
				<p>Help</p>
			</Button>
			<Button
				onClick={clickHandler}
				style={{
					fontSize: 20,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
				}}>
				<p>Evaluate</p>
			</Button>
			<div
				style={{
					flex: 1,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<p
					style={{
						// center the text
						textAlign: 'center',
					}}>
					Accuracy :<span id='accuracy'>0</span>%
				</p>
			</div>
		</div>
	);
};
