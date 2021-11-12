import { __ } from '@wordpress/i18n';

export const blockClassName = 'ystdtb-banner-link';

export const attributes = {
	link: {
		type: 'object',
	},
	backgroundImage: {
		type: 'object',
	},
	backgroundImageFocalPoint: {
		type: 'object',
	},
	ratio: {
		type: 'string',
	},
	size: {
		type: 'object',
	},
	borderRadius: {
		type: 'string',
	},
	backgroundColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	gradient: {
		type: 'string',
	},
	customGradient: {
		type: 'string',
	},
	backgroundOpacity: {
		type: 'number',
	},
	border: {
		type: 'object',
	},
	mainTextFontSize: {
		type: 'object',
	},
	padding: {
		type: 'object',
	},
	boxShadow: {
		type: 'object',
	},
	contentPosition: {
		type: 'object',
	}
};

export const supports = {
	anchor: false,
	align: false,
	className: false,
	lightBlockWrapper: true,
};
