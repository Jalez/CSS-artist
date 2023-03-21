/** @format */

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLevel } from '../../store/slices/levels.slice';
import pixelmatch from 'pixelmatch';
import { Buffer } from 'buffer';
import { updatePointsThunk } from '../../store/actions/score.actions';
import { useAppDispatch } from '../../store/hooks/hooks';
// import my redux store

// prop types
interface FrameProps {
	newHtml: string;
	newCss: string;
}

export const Frame = ({ newHtml, newCss }: FrameProps) => {
	// create a ref for the iframe
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const dispatch = useAppDispatch();
	const { currentLevel } = useSelector((state: any) => state.currentLevel);
	const level = useSelector((state: any) => state.levels[currentLevel - 1]);

	useEffect(() => {
		const resendDataAfterMount = (event: MessageEvent) => {
			if (event.data === 'mounted') {
				console.log('called resendDataAfterMount');
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

		//Listen for messages from the iframe
		window.addEventListener('message', resendDataAfterMount);

		return () => {
			// cleanup
			window.removeEventListener('message', resendDataAfterMount);
		};
	}, []);

	useEffect(() => {
		const handleDataFromIframe = async (event: MessageEvent) => {
			const getPixelData = (img = new Image()) => {
				return new Promise((resolve, reject) => {
					// Create a canvas element
					const canvas = document.createElement('canvas');
					// Set the width and height of the canvas to the width and height of the image
					canvas.width = img.width;
					canvas.height = img.height;
					// Get the 2D context of the canvas
					const ctx = canvas.getContext('2d');
					// Draw the image on the canvas
					ctx?.drawImage(img, 0, 0);
					// Get the image data from the canvas
					const imgData = ctx?.getImageData(0, 0, 400, 300);
					// Resolve the promise with the image data
					resolve(imgData);
				});
			};
			const img2 = new Image();
			img2.src = event.data;
			// set the src of the image to the data url
			// when the image loads, draw it to the canvas
			const curImgUrl = level?.image;
			const img1 = new Image();

			img1.onload = imageLoaded;
			img2.onload = imageLoaded;
			if (curImgUrl) img1.src = curImgUrl;
			// Wait for the image to load
			let imagesLoaded = 0;
			function imageLoaded() {
				imagesLoaded++;
				if (imagesLoaded == 2) {
					allImagesLoaded();
				}
			}

			const allImagesLoaded = async () => {
				// set the src of the image to the data url
				const img1Data = (await getPixelData(img1)) as ImageData;
				const img2Data = (await getPixelData(img2)) as ImageData;

				// Create a diff image with the same dimensions as img1
				const diff = Buffer.alloc(img2Data.data.length as number) as Buffer;
				const width = img1Data?.width;
				const height = img1Data?.height || 0;
				const returnValue = pixelmatch(
					img2Data?.data,
					img1Data?.data,
					diff,
					width,
					height,
					{
						threshold: 0.1,
					}
				);
				dispatch(
					updateLevel({
						id: currentLevel,
						diff: diff.toString('base64'),
						accuracy: returnValue as number,
					})
				);
				dispatch(updatePointsThunk(returnValue as number));
			};

			// create an image element
		};

		window.addEventListener('message', handleDataFromIframe);

		return () => {
			window.removeEventListener('message', handleDataFromIframe);
		};
	}, [currentLevel]);

	useEffect(() => {
		// wait for the iframe to load
		const iframe = iframeRef.current;

		// wait for the iframe to load

		if (iframe) {
			console.log('called useEffect at line 133');
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
