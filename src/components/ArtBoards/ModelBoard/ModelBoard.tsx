/** @format */

import { useState } from 'react';
import { Diff } from './Diff/Diff';
import { BoardContainer } from '../BoardContainer';
import { BoardTitle } from '../BoardTitle';
import { Board } from '../Board';
import { ModelInfoBoard } from './ModelInfoBoard';
import { ModelArtContainer } from './ModelArtContainer';
import { Model } from './Model';
import { useAppSelector } from '../../../store/hooks/hooks';

export const ModelBoard = (): JSX.Element => {
	const modelBoard = useAppSelector((state) => state.board.modelBoard);

	return (
		<BoardContainer>
			<BoardTitle>Model version</BoardTitle>
			<Board>
				<ModelInfoBoard />
				<ModelArtContainer>
					{modelBoard === 'model' ? <Model /> : <Diff />}
				</ModelArtContainer>
			</Board>
		</BoardContainer>
	);
};
