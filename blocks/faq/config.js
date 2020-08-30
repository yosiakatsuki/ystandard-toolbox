import { __ } from '@wordpress/i18n';

export const attributes = {
	isAccordion: {
		type: 'bool',
		default: false,
	},
	isAccordionOpen: {
		type: 'bool',
		default: true,
	},
};

export const supports = {
	align: false,
	className: false,
	lightBlockWrapper: true,
};

export const template = [
	[
		'ystdtb/faq-item',
		{
			faqType: 'q',
		}
	],
	[
		'ystdtb/faq-item',
		{
			faqType: 'a',
		}
	],
];
