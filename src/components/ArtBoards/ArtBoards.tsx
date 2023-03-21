/** @format */

import { useRef, useState } from 'react';
import { Frame } from './Frame';
import './ArtBoard.css';
import { Drawboard } from './Drawboard/Drawboard';
import { ModelBoard } from './ModelBoard/ModelBoard';

interface ArtBoardsProps {
	htmlCode: string;
	cssCode: string;
}

export const ArtBoards = ({ htmlCode, cssCode }: ArtBoardsProps) => {
	return (
		<div id='artBoard'>
			<Drawboard htmlCode={htmlCode} cssCode={cssCode} />
			<ModelBoard />
		</div>
	);
};
