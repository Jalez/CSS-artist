/** @format */

import placeholder from './ImageCard/cardWithImage/Placeholder.svg';
import button from './ImageCard/button.png';
import card from './ImageCard/card.png';
import cardWithImage from './ImageCard/cardWithImage.png';
import couple from './PictureGallery/couple.jpg';
import desert from './PictureGallery/desert.jpg';
import dog from './PictureGallery/dog.jpg';
import oldartist from './PictureGallery/oldartist.jpg';
import me from './PictureGallery/me.jpg';
import PictureGallery from './PictureGallery/PictureGallery.png';

const initialHtml: string = `<div></div>`;
const initialCss: string = `
body {
	margin: 0px;
	background-color: #222;
}
div {
	width: 100px;
	height: 100px;
	background-color: yellow;
}`;
const initialCode = {
	html: initialHtml,
	css: initialCss,
};

const initialDefaults = {
	completed: 'no',
	accuracy: '0',
	code: initialCode,
	points: 0,
	maxPoints: 5,
	diff: '',
	drawingUrl: '',
	solutionUrl: '',
	drawnEvalUrl: '',
	solEvalUrl: '',
	solution: {
		html: '',
		css: '',
	},
	confettiSprinkled: false,
};

interface Level {
	id: number;
	name: string;
	completed: string;
	accuracy: string;
	buildingBlocks?: {
		pictures?: Array<string>;
		colors?: Array<string>;
	};
	code: {
		html: string;
		css: string;
	};
	solution: {
		html: string;
		css: string;
	};
	confettiSprinkled: boolean;

	image: string;
	diff: string;
	difficulty: string;
	points: number;
	maxPoints: number;
	help: {
		description: string;
		images: string[];
		usefullCSSProperties: string[];
	};
	drawingUrl: string;
	solutionUrl: string;
	drawnEvalUrl: string;
	solEvalUrl: string;
}

export const PremadeLevels = [
	{
		id: 1,
		name: 'Level 1',

		buildingBlocks: {
			pictures: [],
			colors: ['#1e88e5', '#f5f5f5'],
		},
		...initialDefaults,

		image: button,
		difficulty: 'button',
		help: {
			description: 'This is the first level',
			images: [],
			usefullCSSProperties: [],
		},
		solutionUrl: button,
	},
	{
		id: 2,
		name: 'Level 2',

		buildingBlocks: {
			pictures: [],
			colors: ['#1e88e5', '#f5f5f5'],
		},
		...initialDefaults,

		image: card,
		difficulty: 'card',
		help: {
			description: 'This is the second level',
			images: [],
			usefullCSSProperties: [],
		},
		solutionUrl: card,
	},
	{
		id: 3,
		name: 'Level 3',

		buildingBlocks: {
			pictures: [placeholder],
			colors: ['#1e88e5', '#f5f5f5'],
		},
		...initialDefaults,
		image: cardWithImage,
		difficulty: 'card with image',
		help: {
			description: 'This is the third level',
			images: [],
			usefullCSSProperties: [],
		},
		solutionUrl: cardWithImage,
	},
	{
		id: 4,
		name: 'Level 4',
		...initialDefaults,
		image: PictureGallery,
		buildingBlocks: {
			pictures: [couple, desert, dog, oldartist, me],
			colors: ['#62374E', '#FDC57B'],
		},
		difficulty: 'Picture Gallery',
		help: {
			description: 'This is the fourth level',
			images: [],
			usefullCSSProperties: [],
		},
		solutionUrl: PictureGallery,
	},
];
