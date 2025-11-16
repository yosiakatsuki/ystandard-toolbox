import { __ } from '@wordpress/i18n';

export const attributes = {
	faqType: {
		type: 'string',
		default: 'q',
	},
	faqTextColor: {
		type: 'string',
	},
	customFaqTextColor: {
		type: 'string',
	},
	faqBackgroundColor: {
		type: 'string',
	},
	customFaqBackgroundColor: {
		type: 'string',
	},
	faqBorderType: {
		type: 'string',
		default: '',
	},
	faqBorderSize: {
		type: 'number',
		default: 0,
	},
	faqBorderColor: {
		type: 'string',
	},
	customFaqBorderColor: {
		type: 'string',
	},
	labelPosition: {
		type: 'string',
		default: 'center',
	},
	labelSize: {
		type: 'string',
	},
	customLabelSize: {
		type: 'string',
	},
	labelColor: {
		type: 'string',
	},
	customLabelColor: {
		type: 'string',
	},
	labelBold: {
		type: 'bool',
		default: true,
	},
	labelBackgroundColor: {
		type: 'string',
	},
	customLabelBackgroundColor: {
		type: 'string',
	},
	labelBorderSize: {
		type: 'number',
		default: 0,
	},
	labelBorderRadius: {
		type: 'number',
		default: 0,
	},
	labelBorderColor: {
		type: 'string',
	},
	customLabelBorderColor: {
		type: 'string',
	},
	accordionArrowColor: {
		type: 'string',
	},
	customAccordionArrowColor: {
		type: 'string',
	},
};

export const supports = {
	align: false,
	className: false,
	lightBlockWrapper: true,
	reusable: false,
};

export const faqBorderTypes = [
	{ label: __( 'なし', 'ystandard-toolbox' ), name: '' },
	{ label: __( '下区切り線', 'ystandard-toolbox' ), name: 'bottom' },
];

export const template = [
	[
		'core/paragraph',
		{ placeholder: __( 'Q&A項目…', 'ystandard-toolbox' ) },
	],
];

export const labelPositions = [
	{ label: __( '上', 'ystandard-toolbox' ), name: 'flex-start' },
	{ label: __( '中央', 'ystandard-toolbox' ), name: 'center' },
	{ label: __( '下', 'ystandard-toolbox' ), name: 'flex-end' },
];
