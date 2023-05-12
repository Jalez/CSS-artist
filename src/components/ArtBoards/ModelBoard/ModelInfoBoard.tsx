/** @format */

// ModelInfoBoard.tsx
import { InfoBoard } from '../../InfoBoard/InfoBoard';
import { InfoColors } from '../../InfoBoard/InfoColors';
import { InfoPictures } from '../../InfoBoard/InfoPictures';

type ModelInfoBoardProps = {};

export const ModelInfoBoard = ({}: ModelInfoBoardProps) => (
	<InfoBoard>
		<InfoColors />
		<InfoPictures />
	</InfoBoard>
);
