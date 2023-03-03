/** @format */

import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useState } from 'react';
import { materialLight, materialDark } from '@uiw/codemirror-theme-material';
import './CodeEditor.css';
import { indentWithTab } from '@codemirror/commands';

// add the CodeEditor components props types here
interface CodeEditorProps {
	lang: any;
	title: string;
	template?: string;
	codeUpdater: (data: { html?: string; css?: string }) => void;
}

// use the CodeEditorProps interface to type the CodeEditor component
export default function CodeEditor({
	lang = html(),
	title = 'HTML',
	template = '',
	codeUpdater,
}: CodeEditorProps) {
	const [code, setCode] = useState<string>(template);

	useEffect(() => {
		codeUpdater({ [title.toLowerCase()]: code });
	}, [code]);

	// Get the users system theme
	const editorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
		? materialDark
		: materialLight;

	return (
		<div
			className='codeEditor'
			style={{
				flex: '1 1 100px',
				border: '1px solid #35393C',
			}}>
			<h2
				style={{
					// add shadow to the text
					textShadow: '2px 5px 1px #000',
				}}
				id='title'>
				{title}
			</h2>
			<CodeMirror
				style={{
					textAlign: 'left',
				}}
				theme={editorTheme}
				value={code}
				placeholder={`Write your ${title} here...`}
				minHeight='300px'
				extensions={[lang]}
				onChange={(value, viewUpdate) => {
					setCode(value);
				}}
			/>
		</div>
	);
}
