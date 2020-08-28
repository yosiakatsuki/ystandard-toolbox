import { __ } from '@wordpress/i18n';

export const attributes = {};

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
