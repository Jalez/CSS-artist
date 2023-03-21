/** @format */

import { Button, Grid } from '@mui/material';
import html2canvas from 'html2canvas';
import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

import './App.css';

import { CSSWordCloud } from './components/CSSWordCloud/CSSWordCloud';
import { Navbar } from './components/Navbar/Navbar';
import { Editors } from './components/Editors/Editors';
import { ArtBoards } from './components/ArtBoards/ArtBoards';
import { Footer } from './components/Footer/Footer';
import { Title } from './components/Title/Title';
import { useAppDispatch, useAppSelector } from './store/hooks/hooks';
import { updateCode } from './store/slices/levels.slice';

function App() {
	const dispatch = useAppDispatch();
	const { currentLevel } = useAppSelector((state) => state.currentLevel);
	const code = useAppSelector((state) => state.levels[currentLevel - 1].code);
	const [htmlCode, setHTMLCode] = useState<string>(code.html);
	const [cssCode, setCSSCode] = useState<string>(code.css);

	useEffect(() => {
		setHTMLCode(code.html);
		setCSSCode(code.css);
	}, [code]);

	const codeUpdater = (data: { html?: string; css?: string }) => {
		if (data.html) {
			setHTMLCode(data.html);
		}
		if (data.css) {
			setCSSCode(data.css);
		}
		dispatch(
			updateCode({
				id: currentLevel,
				code: {
					html: data.html ? data.html : htmlCode,
					css: data.css ? data.css : cssCode,
				},
			})
		);
	};

	return (
		<>
			<Title />
			<Navbar />
			<div className='App'>
				{/* <CSSWordCloud /> */}
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
