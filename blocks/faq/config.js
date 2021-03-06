import { __ } from '@wordpress/i18n';

export const attributes = {
	isAccordion: {
		type: 'bool',
		default: false,
	},
	backgroundColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	borderType: {
		type: 'string',
		default: '',
	},
	borderSize: {
		type: 'number',
		default: 0,
	},
	borderColor: {
		type: 'string',
	},
	customBorderColor: {
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
};

export const faqBorderTypes = [
	{ label: __( 'なし', 'ystandard-toolbox' ), name: '' },
	{ label: __( '上下左右', 'ystandard-toolbox' ), name: 'all' },
	{ label: __( '下のみ', 'ystandard-toolbox' ), name: 'bottom' },
];

export const template = [
	[
		'ystdtb/faq-item',
		{
			faqType: 'q',
		},
	],
	[
		'ystdtb/faq-item',
		{
			faqType: 'a',
		},
	],
];
