/** @format */

import { cssPropertiesArray } from './CSSProperties';
import { WordCloud } from './WordCloud/WordCloud';

export const CSSWordCloud = () => {
	return (
		<div
			className='App'
			style={{
				position: 'absolute',
				zIndex: 0,
			}}>
			<WordCloud words={cssPropertiesArray} />
		</div>
	);
};
