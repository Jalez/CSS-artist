/** @format */

import { Button, Grid } from '@mui/material';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';
import confetti from 'canvas-confetti';

import './App.css';
import img1 from './assets/img1.jpg';
import img2 from './assets/img2.jpg';
import img3 from './assets/img3.png';

import twoRooms from './assets/tworooms.png';

import { Editors } from './components/Editors/Editors';
import { Frame } from './Frame';
import { LeftNav } from './components/Navbar/LeftNav/LeftNav';
import { RightNav } from './components/Navbar/RightNav/RightNav';

const startingCss = `
body {
  margin: 0px;
  background-color: #222;
}
div {
  width: 100px;
  height: 100px;
  background-color: yellow;
}
`;

const startingHtml = `
<div></div>
`;

function App() {
	const [sliderValue, setSliderValue] = useState(100);
	const imgRef = useRef<HTMLImageElement>(null);
	const boardRef = useRef<HTMLDivElement>(null);

	const [htmlCode, setHTMLCode] = useState<string>(startingHtml);
	const [cssCode, setCSSCode] = useState<string>(startingCss);

	const dragSlider = (e: any) => {
		setSliderValue(e.target.value);
		// Use the slider value to change how much of the image is shown horizontally
		if (imgRef.current) {
			imgRef.current.style.clipPath = `polygon(0 0, ${e.target.value}% 0, ${e.target.value}% 100%, 0 100%)`;
		}
	};

	const imgStyle = {
		clipPath: `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)`,
	};

	const codeUpdater = (data: { html?: string; css?: string }) => {
		if (data.html) {
			setHTMLCode(data.html);
		}
		if (data.css) {
			setCSSCode(data.css);
		}
	};

	return (
		<div
			style={{
				backgroundColor: '#333',
				backgroundImage: `url(${twoRooms})`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				backgroundSize: 'stretch',
				border: '10px solid #444',
				borderRadius: 10,
				margin: 0,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center',
				minHeight: '1050px',
				width: '1100px',
			}}>
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
				}}>
				CSS ART <br />
				<span
					style={{
						color: '#15BF92',
						// use Cyberpunk font
						fontFamily: 'Cyberpunk',
						textShadow: '1px 2px 2px #000',
						fontSize: 35,
						// underline the text
						// textDecoration: 'underline',
					}}>
					T.H.I.E.F!
				</span>
			</h1>

			<Grid container spacing={0} style={{}}>
				<Grid item xs={12}>
					<Grid container>
						<Grid item xs={6}>
							<LeftNav></LeftNav>
						</Grid>
						<Grid item xs={6}>
							<RightNav></RightNav>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							padding: 20,
						}}>
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

							<img src={img3} alt='' id='img2' />
							<div id='img1' style={imgStyle} ref={boardRef}>
								<Frame newCss={cssCode} newHtml={htmlCode} />
							</div>
						</div>
						<div id='model' style={{}}>
							<img src={img3} alt='' id='img2' />
						</div>
					</div>
				</Grid>

				<Grid item xs={12}>
					<Editors
						htmlCode={htmlCode}
						cssCode={cssCode}
						codeUpdater={codeUpdater}
					/>
				</Grid>
				<Grid item xs={12}>
					<p
						style={{
							margin: 0,
							// fontSize: 20,
							// center the text
							textAlign: 'center',
							color: '#ccc',
							backgroundColor: '#444',
							padding: 10,
							// give a shadow to the text
							textShadow: '2px 1px 1px #000',
						}}>
						Creating art with the magic of your mind and the power of HTML and
						CSS
					</p>
				</Grid>
			</Grid>
		</div>
	);
}

export default App;
