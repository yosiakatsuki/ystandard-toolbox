import { __ } from '@wordpress/i18n';

export const blockClassName = 'ystdtb-banner-link';

export const attributes = {
	link:{
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
};

export const supports = {
	anchor: false,
	align: false,
	className: false,
	lightBlockWrapper: true,
};
