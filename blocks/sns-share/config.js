import { __ } from '@wordpress/i18n';

export const attributes = {
	align: {
		type: 'string',
		default: '',
	},
	buttonType: {
		type: 'string',
		default: 'circle',
	},
	labelBefore: {
		type: 'string',
		default: '',
	},
	labelAfter: {
		type: 'string',
		default: '',
	},
	useTwitter: {
		type: 'bool',
		default: true,
	},
	useFacebook: {
		type: 'bool',
		default: true,
	},
	useHatenaBookmark: {
		type: 'bool',
		default: true,
	},
	usePocket: {
		type: 'bool',
		default: true,
	},
	useLINE: {
		type: 'bool',
		default: true,
	},
	twitterVia: {
		type: 'string',
		default: '',
	},
	twitterRelatedUser: {
		type: 'string',
		default: '',
	},
	twitterHashTags: {
		type: 'string',
		default: '',
	},
};
export const supports = {
	customClassName: false,
	className: false,
	html: false,
	align: false,
};

export const shareButtonsDesign = [
	{ label: __( '円', 'ystandard-toolbox' ), value: 'circle' },
	{ label: __( '四角', 'ystandard-toolbox' ), value: 'square' },
	{ label: __( 'アイコン', 'ystandard-toolbox' ), value: 'icon' },
	{ label: __( '公式', 'ystandard-toolbox' ), value: 'official' },
];
