/** @format */

// create prop interface
interface NavTextProps {
	children: any;
}

export const InfoText = ({ children }: NavTextProps) => {
	return (
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
				{children}
			</p>
		</div>
	);
};
