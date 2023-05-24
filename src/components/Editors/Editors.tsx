/** @format */
import CodeEditor from './CodeEditor/CodeEditor';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { updateCode } from '../../store/slices/levels.slice';
import EditorsContainer from './EditorsContainer';

export const Editors = () => {
	const dispatch = useAppDispatch();
	const { currentLevel } = useAppSelector((state) => state.currentLevel);
	const levels = useAppSelector((state: any) => state.levels);
	const htmlCode = levels[currentLevel - 1].code.html;
	const cssCode = levels[currentLevel - 1].code.css;

	const codeUpdater = (data: { html?: string; css?: string }) => {
		dispatch(
			updateCode({
				id: currentLevel,
				code: { ...levels[currentLevel - 1].code, ...data },
			})
		);
	};

	return (
		<EditorsContainer>
			<CodeEditor
				lang={css()}
				title='CSS'
				codeUpdater={codeUpdater}
				template={cssCode}
			/>
			<CodeEditor
				lang={html()}
				title='HTML'
				codeUpdater={codeUpdater}
				template={htmlCode}
				locked={true}
			/>
		</EditorsContainer>
	);
};
