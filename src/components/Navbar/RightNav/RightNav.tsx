/** @format */

import { Button } from '@mui/material';
import './RightNav.css';

export const RightNav = () => {
	return (
		<div id='right-nav'>
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
						textAlign: 'center',
					}}>
					Level passed: <span id='passIndicator'>NJET</span>
				</p>
			</div>
			<Button
				style={{
					fontSize: 20,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
				}}>
				<p>Levels</p>
			</Button>
		</div>
	);
};
