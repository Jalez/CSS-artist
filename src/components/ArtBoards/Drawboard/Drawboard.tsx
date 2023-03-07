/** @format */

import { useRef, useState } from 'react';
import { Frame } from '../Frame';
import { Model } from '../ModelBoard/Model/Model';
import './Drawboard.css';

interface DrawboardProps {
	htmlCode: string;
	cssCode: string;
}

export const Drawboard = ({ htmlCode, cssCode }: DrawboardProps) => {
	const [sliderValue, setSliderValue] = useState(100);
	const imgRef = useRef<HTMLImageElement>(null);
	const boardRef = useRef<HTMLDivElement>(null);

	const imgStyle = {
		clipPath: `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)`,
	};

	const dragSlider = (e: any) => {
		setSliderValue(e.target.value);
		// Use the slider value to change how much of the image is shown horizontally
		if (imgRef.current) {
			imgRef.current.style.clipPath = `polygon(0 0, ${e.target.value}% 0, ${e.target.value}% 100%, 0 100%)`;
		}
	};
	return (
		<div className='board'>
			<div className='slidecontainer'>
				<input
					type='range'
					min='1'
					max='100'
					value={sliderValue}
					className='slider'
					id='myRange'
					onInput={dragSlider}
				/>
			</div>

			<Model />
			<div id='img1' style={imgStyle} ref={boardRef}>
				<Frame newCss={cssCode} newHtml={htmlCode} />
			</div>
		</div>
	);
};
