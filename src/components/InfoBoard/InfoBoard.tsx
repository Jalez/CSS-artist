/** @format */

import { InfoText } from './InfoText';

interface InfoBoardProps {
	children: any;
}

export const InfoBoard = ({ children }: InfoBoardProps) => {
	return (
		<div
			id='info-board'
			style={{
				// position: 'absolute',
				zIndex: 100,
				top: '5%',
				backgroundColor: '#2b2b2e',
				// border: '0.5em solid #444',
				color: 'white',
				boxShadow: '0 0 0.5em #444',
				padding: '0.5em',
			}}>
			<div
				id='info-board-container'
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				{/* map through children */}
				{children
					? children.map((child: any, index: number) => (
						<div
							key={index}
							style={{
								flex: 1,
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
								border: '0.1em solid #444',
							}}>
							{child}
						</div>
					))
					: null}
			</div>
		</div>
	);
};
