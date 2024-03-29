/** @format */

interface InfoBoardProps {
	children: any;
}

export const InfoBoard = ({ children }: InfoBoardProps) => {
	return (
		<div
			// id='info-board'
			style={{
				backgroundColor: '#1E1E1E',
				// border: '0.5em solid #444',
				color: 'white',
				height: '4em',
				width: '100%',
				padding: '1em',
				boxSizing: 'border-box',
				borderBottom: '5px solid #111',
				zIndex: 100,
				position: 'relative',
			}}>
			<div
				id='info-board-container'
				style={{
					display: 'flex',
					width: '100%',
					height: '100%',
				}}>
				{/* map through children */}
				{children && children.length > 1
					? children.map((child: any, index: number) => (
							<div
								key={index}
								style={{
									width: '100%',
									height: '100%',
									flex: 1,
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
									alignItems: 'center',
									// border: '0.1em solid #444',
								}}>
								{child}
							</div>
					  ))
					: children}
			</div>
		</div>
	);
};
