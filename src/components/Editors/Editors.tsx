/** @format */

import { Button, ButtonGroup } from '@mui/material';
import CodeEditor from './CodeEditor/CodeEditor';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { useState } from 'react';

interface EditorsProps {
	codeUpdater: (data: { html?: string; css?: string }) => void;
	htmlCode: string;
	cssCode: string;
}

export const Editors = ({ codeUpdater, htmlCode, cssCode }: EditorsProps) => {
	const buttonClickHandler = () => {
		console.log('CSS', cssCode);
		console.log('HTML', htmlCode);
		// Send the code to the iframe
	};

	return (
		<div
			className='editors'
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignContent: 'center',
				justifyContent: 'space-between',
				// flexWrap: 'wrap',
			}}>
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
			/>

			{/* <ButtonGroup
				variant='contained'
				aria-label='Code editor button group'
				// color='primary'
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignContent: 'center',
					justifyContent: 'space-between',
					flexWrap: 'wrap',
					borderRadius: '0',
					bgcolor: '#35393C',
				}}>
				<Button sx={{ flex: '1 1 auto' }} onClick={buttonClickHandler}>
					Execute
				</Button>
			</ButtonGroup> */}
		</div>
	);
};
