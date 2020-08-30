import { __ } from '@wordpress/i18n';

export const attributes = {
	faqType: {
		type: 'string',
		default: 'q',
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
	labelSize: {
		type: 'string',
	},
	customLabelSize: {
		type: 'number',
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

export const designPreset = [
	{
		name: 'default',
		label: __( 'デフォルト', 'ystandard-toolbox' ),
		itemStyles: {},
		labelStyles: {
			color: '#222222',
			fontWeight: 'bold',
			width: '2em',
			height: '2em',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		attributes: {
			faqBackgroundColor: undefined,
			faqBorderType: '',
			faqBorderSize: 0,
			faqBorderColor: undefined,
			labelSize: undefined,
			labelColor: undefined,
			labelBold: true,
			labelBackgroundColor: undefined,
			labelBorderSize: 0,
			labelBorderRadius: 0,
			labelBorderColor: undefined,
		}
	},
	{
		name: 'background-square',
		label: __( '背景あり四角', 'ystandard-toolbox' ),
		itemStyles: {},
		labelStyles: {
			fontWeight: 'bold',
			backgroundColor: '#f1f1f3',
			color: '#222222',
			width: '2em',
			height: '2em',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		attributes: {
			faqBackgroundColor: undefined,
			faqBorderType: '',
			faqBorderSize: 0,
			faqBorderColor: undefined,
			labelSize: undefined,
			labelColor: '#222222',
			labelBold: true,
			labelBackgroundColor: '#f1f1f3',
			labelBorderSize: 0,
			labelBorderRadius: 0,
			labelBorderColor: undefined,
		}
	},
	{
		name: 'background-circle',
		label: __( '背景あり丸', 'ystandard-toolbox' ),
		itemStyles: {},
		labelStyles: {
			fontWeight: 'bold',
			backgroundColor: '#f1f1f3',
			color: '#222222',
			width: '2em',
			height: '2em',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: '50px',
		},
		attributes: {
			faqBackgroundColor: undefined,
			faqBorderType: '',
			faqBorderSize: 0,
			faqBorderColor: undefined,
			labelSize: undefined,
			labelColor: '#222222',
			labelBold: true,
			labelBackgroundColor: '#f1f1f3',
			labelBorderSize: 0,
			labelBorderRadius: 50,
			labelBorderColor: undefined,
		}
	},
	{
		name: 'outline-square',
		label: __( '四角アウトライン', 'ystandard-toolbox' ),
		itemStyles: {},
		labelStyles: {
			fontWeight: 'bold',
			backgroundColor: '#ffffff',
			color: '#666666',
			width: '2em',
			height: '2em',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			border: '2px solid #666666',
		},
		attributes: {
			faqBackgroundColor: undefined,
			faqBorderType: '',
			faqBorderSize: 0,
			faqBorderColor: undefined,
			labelSize: undefined,
			labelColor: '#666666',
			labelBold: true,
			labelBackgroundColor: '#ffffff',
			labelBorderSize: 2,
			labelBorderRadius: 0,
			labelBorderColor: '#666666',
		}
	},
	{
		name: 'outline-circle',
		label: __( '丸アウトライン', 'ystandard-toolbox' ),
		itemStyles: {},
		labelStyles: {
			fontWeight: 'bold',
			backgroundColor: '#ffffff',
			color: '#666666',
			width: '2em',
			height: '2em',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			border: '2px solid #666666',
			borderRadius: '50px',
		},
		attributes: {
			faqBackgroundColor: undefined,
			faqBorderType: '',
			faqBorderSize: 0,
			faqBorderColor: undefined,
			labelSize: undefined,
			labelColor: '#666666',
			labelBold: true,
			labelBackgroundColor: '#ffffff',
			labelBorderSize: 2,
			labelBorderRadius: 50,
			labelBorderColor: '#666666',
		}
	},
	{
		name: 'bottom-divider',
		label: __( '区切り線あり', 'ystandard-toolbox' ),
		itemStyles: {
			paddingBottom: '.25em',
			borderBottom: '1px solid #aaaaaa',
		},
		labelStyles: {
			color: '#222222',
			fontWeight: 'bold',
			width: '2em',
			height: '2em',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		attributes: {
			faqBackgroundColor: undefined,
			faqBorderType: 'bottom',
			faqBorderSize: 1,
			faqBorderColor: '#aaaaaa',
			labelSize: undefined,
			labelColor: undefined,
			labelBold: true,
			labelBackgroundColor: undefined,
			labelBorderSize: 0,
			labelBorderRadius: 0,
			labelBorderColor: undefined,
		}
	},
];
