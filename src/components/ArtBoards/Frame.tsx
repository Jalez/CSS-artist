/** @format */

import { useEffect, useRef } from 'react';

// prop types
interface FrameProps {
	newHtml: string;
	newCss: string;
}

export const Frame = ({ newHtml, newCss }: FrameProps) => {
	// create a ref for the iframe
	const iframeRef = useRef<HTMLIFrameElement>(null);

	const resendDataAfterMount = (event: MessageEvent) => {
		if (event.data === 'mounted') {
			console.log('mounted');
			// Send the new html and css to the iframe
			iframeRef.current?.contentWindow?.postMessage(
				{
					html: newHtml,
					css: newCss,
				},
				'*'
			);
		}
	};

	useEffect(() => {
		//Listen for messages from the iframe
		window.addEventListener('message', resendDataAfterMount);

		return () => {
			// cleanup
			window.removeEventListener('message', resendDataAfterMount);
		};
	}, []);

	useEffect(() => {
		// wait for the iframe to load
		const iframe = iframeRef.current;

		// wait for the iframe to load

		if (iframe) {
			// send a message to the iframe
			iframe.contentWindow?.postMessage(
				{
					html: newHtml,
					css: newCss,
				},
				'*'
			);
		}
	}, [newHtml, newCss, iframeRef]);

	return (
		<iframe
			ref={iframeRef}
			src='http://localhost:3500/'
			style={{
				width: '100%',
				height: '100%',
				overflow: 'hidden',
				border: 'none',
				backgroundColor: '#2b2b2e',
			}}></iframe>
	);
};
