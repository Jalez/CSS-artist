/** @format */

export const Title = () => {
	return (
		<h1
			style={{
				margin: 10,
				fontSize: 50,
				color: '#EB821F',
				// give a shadow to the text
				textShadow: '1px 2px 2px #000',
				textAlign: 'center',
				// make it so it cant be selected
				userSelect: 'none',
				zIndex: 1,
			}}>
			CSS
			<span
				style={{
					color: '#15BF92',
					// use Cyberpunk font
					fontFamily: 'Cyberpunk',
					textShadow: '1px 2px 2px #000',
					// push the text up
					position: 'relative',
					top: -10,
					//and to the right
					left: 20,
					// fontSize: 50,
					// underline the text
					// textDecoration: 'underline',
				}}>
				ARTIST
			</span>
		</h1>
	);
};
