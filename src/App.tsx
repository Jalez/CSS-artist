/** @format */

import { Button, Grid } from '@mui/material';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';
import confetti from 'canvas-confetti';

import './App.css';

import { CSSWordCloud } from './components/CSSWordCloud/CSSWordCloud';
import { Navbar } from './components/Navbar/Navbar';
import { Editors } from './components/Editors/Editors';
import { ArtBoards } from './components/ArtBoards/ArtBoards';
import { Footer } from './components/Footer/Footer';
import { Title } from './components/Title/Title';

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
	const [htmlCode, setHTMLCode] = useState<string>(startingHtml);
	const [cssCode, setCSSCode] = useState<string>(startingCss);

	const codeUpdater = (data: { html?: string; css?: string }) => {
		if (data.html) {
			setHTMLCode(data.html);
		}
		if (data.css) {
			setCSSCode(data.css);
		}
	};

	return (
		<>
			<Title />
			<Navbar />
			<div className='App'>
				<CSSWordCloud />

				<ArtBoards cssCode={cssCode} htmlCode={htmlCode} />
			</div>
			<Editors
				htmlCode={htmlCode}
				cssCode={cssCode}
				codeUpdater={codeUpdater}
			/>
			<Footer />
		</>
	);
}

export default App;
