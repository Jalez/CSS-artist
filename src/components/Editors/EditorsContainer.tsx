/** @format */

interface EditorsContainerProps {
	children: React.ReactNode;
}

const editorsContainerStyle = {
	display: 'flex' as const,
	flexDirection: 'row' as const,
	alignContent: 'center' as const,
	justifyContent: 'space-between' as const,
	flex: '1 1 100%',
	position: 'relative' as const,
	backgroundColor: '#1E1E1E',
	maxWidth: '100%',
	flexWrap: 'wrap' as const,
	zIndex: 1,
	border: '5px solid #111',
};

const EditorsContainer = ({ children }: EditorsContainerProps) => {
	return (
		<div className='editors-container' style={editorsContainerStyle}>
			{children}
		</div>
	);
};

export default EditorsContainer;
