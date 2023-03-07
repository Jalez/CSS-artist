/** @format */
import pixelmatch from 'pixelmatch';
import { Buffer } from 'buffer';
import confetti from 'canvas-confetti';

const getPixelData = (img = new Image()) => {
	return new Promise((resolve, reject) => {
		console.log('getPixelData');

		// Create a canvas element
		const canvas = document.createElement('canvas');
		// Set the width and height of the canvas to the width and height of the image
		console.log('Getting here');

		canvas.width = img.width;
		canvas.height = img.height;
		// Get the 2D context of the canvas
		const ctx = canvas.getContext('2d');
		// Draw the image on the canvas
		ctx?.drawImage(img, 0, 0);
		// Get the image data from the canvas
		const imgData = ctx?.getImageData(0, 0, 400, 300);
		// , 300);
		// Resolve the promise with the image data
		resolve(imgData);
	});
};

window.addEventListener('message', (e) => {
	console.log('Message received: ', e.data);
	// take the data url from the message
	const dataUrl = e.data;
	// create an image element
	const img = new Image();
	// set the src of the image to the data url
	img.src = dataUrl;
	// when the image loads, draw it to the canvas
	img.onload = async () => {
		// create a canvas element
		const canvas = document.createElement('canvas');
		// set the width and height of the canvas
		canvas.width = img.width;
		canvas.height = img.height;
		// get the context of the canvas
		const ctx = canvas.getContext('2d');
		// draw the image to the canvas
		ctx?.drawImage(img, 0, 0);
		// Add the canvas to the DOM
		const img1 = document.querySelector('#img2');

		const img1Data = await getPixelData(img1);
		const img2Data = await getPixelData(img);
		console.log('img1Data', img2Data);
		console.log('img2Data', img2Data);

		// Create a diff image with the same dimensions as img1
		const diff = new Buffer.alloc(img2Data.data.length);
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
		console.log('returnValue', returnValue);
		// Get the percentage of pixels that are different
		let percentage = 100 - (returnValue / (width * height)) * 100;

		// if percentage is over 90, use confetti
		if (percentage > 90) {
			confetti({
				particleCount: 100,
				// spread: 70,
				// origin: { y: 0.6 },
			});

			// use the element with the id of passIndicator and set the innerHTML to 'JAH WOLL'
			document.getElementById('passIndicator').innerHTML = 'JAH WOLL!';
		}

		// Round the percentage to 2 decimal places
		percentage = percentage.toFixed(2);
		//find element with id accuracy and set the innerHTML to the percentage
		document.getElementById('accuracy').innerHTML = `${percentage}`;
		// Log the percentage to the console

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
		diffImgData.data.set(diff);
		// Draw the ImageData object to the canvas
		diffCtx?.putImageData(diffImgData, 0, 0);
		// put the canvas in the DOM
		// get the element with the id of diff and append the canvas to it
		document.getElementById('diff').appendChild(diffCanvas);
	};
});
