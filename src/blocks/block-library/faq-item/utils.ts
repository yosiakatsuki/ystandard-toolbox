import { __ } from '@wordpress/i18n';
import type {
	BorderTypeOption,
	LabelPositionOption,
	DesignPreset,
} from '../faq/types';

/**
 * FAQアイテムのボーダータイプ選択肢
 */
export const faqBorderTypes: BorderTypeOption[] = [
	{ label: __( 'なし', 'ystandard-toolbox' ), name: '' },
	{ label: __( '下区切り線', 'ystandard-toolbox' ), name: 'bottom' },
];

/**
 * FAQアイテムの初期テンプレート
 */
export const template: [ string, Record< string, any > ][] = [
	[
		'core/paragraph',
		{ placeholder: __( 'Q&A項目…', 'ystandard-toolbox' ) },
	],
];

/**
 * ラベル位置選択肢
 */
export const labelPositions: LabelPositionOption[] = [
	{ label: __( '上', 'ystandard-toolbox' ), name: 'flex-start' },
	{ label: __( '中央', 'ystandard-toolbox' ), name: 'center' },
	{ label: __( '下', 'ystandard-toolbox' ), name: 'flex-end' },
];

/**
 * デザインプリセット
 */
export const designPreset: DesignPreset[] = [
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
		},
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
		},
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
		},
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
		},
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
		},
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
		},
	},
];
