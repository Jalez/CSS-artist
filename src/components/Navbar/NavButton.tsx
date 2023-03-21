/** @format */

import { Button } from '@mui/material';

// create interface for props
interface NavButtonProps {
	clickHandler: any;
	children: any;
	disabled?: boolean;
}

export const NavButton = ({
	clickHandler,
	children,
	disabled,
}: NavButtonProps) => {
	return (
		<Button
			onClick={clickHandler}
			style={{
				fontFamily: 'Kontakt',
				flex: 1,
				color: disabled ? 'grey' : 'black',
			}}
			disabled={disabled}>
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
