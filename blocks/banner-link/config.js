import { __ } from '@wordpress/i18n';

export const blockClassName = 'ystdtb-banner-link';

export const blockClasses = {
	container: 'ystdtb-banner-link__container',
	overlayBackground: 'ystdtb-banner-link__overlay-background',
	overlayBorder: 'ystdtb-banner-link__overlay-border',
	text: 'ystdtb-banner-link__text',
	mainText: 'ystdtb-banner-link__main-text',
	subText: 'ystdtb-banner-link__sub-text',
};

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
	ratio: {
		type: 'string',
	},
	size: {
		type: 'object',
	},
	borderRadius: {
		type: 'string',
	},
	border: {
		type: 'object',
	},
	mainText: {
		type: 'string',
		source: 'html',
		selector: '.ystdtb-banner-link__main-text'
	},
	mainTextFontSize: {
		type: 'object',
	},
	mainTextColor: {
		type: 'string',
	},
	customMainTextColor: {
		type: 'string',
	},
	mainTextLineHeight: {
		type: 'number',
	},
	mainTextLetterSpacing: {
		type: 'string',
	},
	mainTextHtml: {
		type: 'string',
	},
	mainTextStyleClear: {
		type: 'bool',
		default: true,
	},
	subText: {
		type: 'string',
		source: 'html',
		selector: '.ystdtb-banner-link__sub-text'
	},
	subTextFontSize: {
		type: 'object',
	},
	subTextColor: {
		type: 'string',
	},
	customSubTextColor: {
		type: 'string',
	},
	subTextLineHeight: {
		type: 'number',
	},
	subTextLetterSpacing: {
		type: 'string',
	},
	subTextHtml: {
		type: 'string',
	},
	subTextStyleClear: {
		type: 'bool',
		default: true,
	},
	subTextMargin: {
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
	},
	blockPosition: {
		type: 'string',
	}
};

export const supports = {
	anchor: false,
	align: false,
	className: false,
	lightBlockWrapper: true,
};

export const textHtmlTag = [
	{ value: 'div', label: 'div' },
	{ value: 'h1', label: 'h1' },
	{ value: 'h2', label: 'h2' },
	{ value: 'h3', label: 'h3' },
	{ value: 'h4', label: 'h4' },
	{ value: 'h5', label: 'h5' },
	{ value: 'h6', label: 'h6' },
	{ value: 'p', label: 'p' },
];

export const headingTag = [
	'h1',
	'h2',
	'h3',
	'h4',
	'h5',
	'h6',
];
