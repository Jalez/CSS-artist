/** @format */

import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView, ViewUpdate } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import {
	Box,
	Button,
	Typography,
	Modal,
	Backdrop,
	Fade,
	Paper,
} from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { vscodeDark, vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import {
	ReactCodeMirrorProps,
	ReactCodeMirrorRef,
} from '@uiw/react-codemirror';

import './CodeEditor.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';

interface CodeEditorProps {
	lang: any;
	title: string;
	template?: string;
	codeUpdater: (data: { html?: string; css?: string }) => void;
	locked?: boolean;
}

interface CodeMirrorProps extends ReactCodeMirrorProps {
	options: {
		lineWrapping?: boolean;
		lineNumbers?: boolean;
		viewportMargin?: number;
		readOnly?: boolean;
		className?: string;

		// add any other CodeMirror options you need here
	};
}

export default function CodeEditor({
	lang = html(),
	title = 'HTML',
	template = '',
	codeUpdater,
	locked = false,
}: CodeEditorProps) {
	const editorRef = useRef<ReactCodeMirrorRef>(null);
	const currentLevel = useAppSelector(
		(state) => state.currentLevel.currentLevel
	);

	const [code, setCode] = useState<string>(template);

	useEffect(() => {
		codeUpdater({ [title.toLowerCase()]: code });
	}, [code]);

	useEffect(() => {
		setCode(template);
	}, [template]);

	const editorTheme = vscodeDark;

	const cmProps: CodeMirrorProps = {
		options: {
			lineWrapping: true,
			lineNumbers: true,
			// viewportMargin: Infinity,
			readOnly: true,
			className: 'readOnly',
			// add any other CodeMirror options you need here
		},
		value: code,
		extensions: [
			lang,
			EditorState.readOnly.of(locked),
			EditorView.editable.of(!locked),
			EditorView.lineWrapping,
		],
		theme: editorTheme,
		placeholder: `Write your ${title} here...`,
		style: {
			textAlign: 'left',
			height: '100%',
			overflow: 'auto',
			boxSizing: 'border-box',
		},
		onChange: (value: string, viewUpdate: ViewUpdate) => {
			if (locked) {
				console.log('changed', value);
				setCode(code);
			}
			setCode(value);
		},
	};

	const containerStyles = {
		flex: '1 1 20px',
		borderLeft: '3px solid #222',
	};

	return (
		<div
			className='codeEditor'
			style={containerStyles}
			title={
				locked ? "You can't edit this code" : ' Click on the code to edit it'
			}>
			<CodeMirror {...cmProps} />
		</div>
	);
}
