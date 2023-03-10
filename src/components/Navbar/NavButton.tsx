/** @format */

import { Button } from '@mui/material';

// create interface for props
interface NavButtonProps {
	clickHandler: any;
	children: any;
}

export const NavButton = ({ clickHandler, children }: NavButtonProps) => {
	return (
		<Button
			onClick={clickHandler}
			style={{
				fontFamily: 'Kontakt',
				flex: 1,
				color: 'black',
			}}>
			<span
				style={{
					backdropFilter: 'blur(1px)',
					fontSize: 30,
					// make it stronger
					fontWeight: 'bold',
				}}>
				{children}
			</span>
		</Button>
	);
};
