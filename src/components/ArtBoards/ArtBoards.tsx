/** @format */

import { CSSWordCloud } from '../CSSWordCloud/CSSWordCloud';
import { LevelData } from '../InfoBoard/LevelData';
import './ArtBoard.css';
import { Drawboard } from './Drawboard/Drawboard';
import { ModelBoard } from './ModelBoard/ModelBoard';
import { InfoHeading } from '../InfoBoard/InfoHeading';
import { BoardsContainer } from './BoardsContainer';
import { InfoSwitch } from '../InfoBoard/InfoSwitch';
import { InfoBoard } from '../InfoBoard/InfoBoard';

const artBoardStyle = {
	position: 'relative' as const,
	width: '100%',
	overflow: 'hidden',
};

export const ArtBoards = (): JSX.Element => {
	return (
		<div style={artBoardStyle}>
			<InfoBoard>
				<InfoSwitch />
			</InfoBoard>
			<InfoHeading variant='h2'>
				<LevelData reduxState='difficulty' />
			</InfoHeading>
			<BoardsContainer>
				<Drawboard />
				<ModelBoard />
			</BoardsContainer>
			<CSSWordCloud />
		</div>
	);
};
