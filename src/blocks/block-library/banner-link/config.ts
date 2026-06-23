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
		selector: '.ystdtb-banner-link__main-text',
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
		selector: '.ystdtb-banner-link__sub-text',
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
	},
};

export const supports = {
	anchor: false,
	align: false,
	className: false,
	lightBlockWrapper: true,
};

export const textHtmlTag = [
	{ key: 'div', name: 'div' },
	{ key: 'h1', name: 'h1' },
	{ key: 'h2', name: 'h2' },
	{ key: 'h3', name: 'h3' },
	{ key: 'h4', name: 'h4' },
	{ key: 'h5', name: 'h5' },
	{ key: 'h6', name: 'h6' },
	{ key: 'p', name: 'p' },
];

export const headingTag = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ];
