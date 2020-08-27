import { __ } from '@wordpress/i18n';

export const attributes = {
	labelType: {
		type: 'string',
		default: '',
	},
	labelContents: {
		type: 'string',
		default: '',
	},
	labelBold: {
		type: 'bool',
		default: false,
	},
	labelColor: {
		type: 'string',
	},
	customLabelColor: {
		type: 'string',
	},
	labelBackgroundColor: {
		type: 'string',
	},
	customLabelBackgroundColor: {
		type: 'string',
	},
	labelFontSize: {
		type: 'string',
		default: 'small',
	},
	customLabelFontSize: {
		type: 'number',
		default: 14,
	},
	labelBorderSize: {
		type: 'number',
		default: 0,
	},
	labelBorderRadius: {
		type: 'number',
		default: 50,
	},
	labelBorderColor: {
		type: 'string',
	},
	customLabelBorderColor: {
		type: 'string',
	},
	contentsInnerMargin: {
		type: 'string',
		default: 'normal',
	},
	contentMarginTop: {
		type: 'number',
	},
	contentsBorderColor: {
		type: 'string',
	},
	customContentsBorderColor: {
		type: 'string',
	},
};

export const supports = {
	align: false,
	className: false,
	lightBlockWrapper: true,
};

export const labelTypes = [
	{ label: __( 'なし', 'ystandard-toolbox' ), name: '' },
	{ label: __( 'アイコン', 'ystandard-toolbox' ), name: 'icon' },
	{ label: __( 'テキスト', 'ystandard-toolbox' ), name: 'text' },
];
export const innerMargin = [
	{ label: __( '小', 'ystandard-toolbox' ), name: 'small' },
	{ label: __( '通常', 'ystandard-toolbox' ), name: 'normal' },
	{ label: __( '大', 'ystandard-toolbox' ), name: 'large' },
];

export const template = [
	[
		'core/paragraph',
		{ placeholder: __( 'タイムラインコンテンツ…', 'ystandard-toolbox' ) },
	],
];
