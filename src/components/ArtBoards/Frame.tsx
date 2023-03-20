/** @format */

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateLevel } from '../../store/slices/levels.slice';
import pixelmatch from 'pixelmatch';
import { Buffer } from 'buffer';
// import my redux store

// prop types
interface FrameProps {
	newHtml: string;
	newCss: string;
}

export const Frame = ({ newHtml, newCss }: FrameProps) => {
	// create a ref for the iframe
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const dispatch = useDispatch();
	const { currentLevel } = useSelector((state: any) => state.currentLevel);
	const level = useSelector((state: any) => state.levels[currentLevel - 1]);

	useEffect(() => {
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
			console.log('curImgUrl', curImgUrl);
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
				// create a canvas element
				const canvas = document.createElement('canvas');
				console.log('Getting here in levels.slice.ts');
				// set the width and height of the canvas
				console.log('WIDTH img1', img1.width);
				console.log('WIDTH img2', img2.width);
				canvas.width = img2.width;
				canvas.height = img2.height;
				// get the context of the canvas
				const ctx = canvas.getContext('2d');
				// draw the image to the canvas
				ctx?.drawImage(img2, 0, 0);
				// Add the canvas to the DOM
				console.log('Getting here in levels.slice.ts 2');
				// Set the curImgUrl to the image

				// when the image loads, draw it to the canvas

				// set the src of the image to the data url

				const img1Data = (await getPixelData(img1)) as ImageData;
				console.log('img1Data', img1Data);
				const img2Data = (await getPixelData(img2)) as ImageData;

				// Create a diff image with the same dimensions as img1
				const diff = Buffer.alloc(img2Data.data.length as number) as Buffer;
				// Get the width and height of the images
				// make sure both images have the same dimensions

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
				// Get the percentage of pixels that are different
				const percentage = (returnValue / (width * height)) * 100;

				// Create a new canvas element
				const diffCanvas = document.createElement('canvas');
				// Set the width and height of the canvas
				diffCanvas.width = width;
				diffCanvas.height = height;
				// Get the 2D context of the canvas
				const diffCtx = diffCanvas.getContext('2d');
				// Create an ImageData object with the diff data
				const diffImgData = diffCtx?.createImageData(width, height);
				// Set the data of the ImageData object to the diff data
				diffImgData?.data.set(diff);
				// Draw the ImageData object to the canvas
				diffCtx?.putImageData(diffImgData as ImageData, 0, 0);
				// put the canvas in the DOM
				// get the element with the id of diff and append the canvas to it
				dispatch(
					updateLevel({
						id: 1,
						diff: diff as Buffer,
						accuracy: returnValue as number,
					})
				);
			};

			// create an image element
		};

		window.addEventListener('message', handleDataFromIframe);

		return () => {
			window.removeEventListener('message', handleDataFromIframe);
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
