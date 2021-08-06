import { __ } from '@wordpress/i18n';

export const blockClassName = 'ystdtb-box';

export const attributes = {
	boxStyle: {
		type: 'string',
		default: 'label-out',
	},
	boxBackgroundColor: {
		type: 'string',
	},
	customBoxBackgroundColor: {
		type: 'string',
	},
	boxTextColor: {
		type: 'string',
	},
	customBoxTextColor: {
		type: 'string',
	},
	boxBorderColor: {
		type: 'string',
	},
	customBoxBorderColor: {
		type: 'string',
		default: '#666666',
	},
	boxBorderSize: {
		type: 'string',
		default: '1px',
	},
	boxBorderStyle: {
		type: 'string',
		default: 'solid',
	},
	boxBorderRadius: {
		type: 'string',
	},
	boxPadding: {
		type: 'object',
	},
	isResponsiveBoxPadding: {
		type: 'bool',
		default: false,
	},
	label: {
		type: 'string',
	},
	labelFontSize: {
		type: 'string',
	},
	customLabelFontSize: {
		type: 'string',
		default: '0.9em',
	},
	labelBackgroundColor: {
		type: 'string',
	},
	customLabelBackgroundColor: {
		type: 'string',
		default: '#666666',
	},
	labelTextColor: {
		type: 'string',
	},
	customLabelTextColor: {
		type: 'string',
	},
	labelIcon: {
		type: 'string',
	},
	labelBorderRadius: {
		type: 'string',
	},
};

export const supports = {
	anchor: false,
	align: false,
	className: false,
	lightBlockWrapper: true,
};

export const boxStyleList = [
	{ value: 'label-out', label: __( '外側ラベル', 'ystandard-toolbox' ) },
	{ value: 'label-in', label: __( '内側ラベル', 'ystandard-toolbox' ) },
	{ value: 'label-wide', label: __( '全幅ラベル', 'ystandard-toolbox' ) },
	{ value: 'label-line', label: __( '線上ラベル', 'ystandard-toolbox' ) },
];

export const units = [
	{ value: 'px', label: 'px' },
	{ value: 'em', label: 'em' },
	{ value: '%', label: '%' },
];

export const borderStyles = [
	{ value: 'solid', label: __( '直線', 'ystandard-toolbox' ) },
	{ value: 'dotted', label: __( '点線', 'ystandard-toolbox' ) },
	{ value: 'dashed', label: __( '破線', 'ystandard-toolbox' ) },
	{ value: 'double', label: __( '二重線', 'ystandard-toolbox' ) },
];
