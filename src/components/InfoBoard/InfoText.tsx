/** @format */

import { useSelector } from 'react-redux';

// create prop interface
interface NavTextProps {
	children: any;
	reduxState: any;
}

export const InfoText = ({ children, reduxState }: NavTextProps) => {
	// get redux state
	// const state = useSelector((state: any) => state[reduxState]);
	return (
		<>
			<p
				style={{
					textAlign: 'center',
				}}>
				{children}
			</p>
		</>
	);
};
