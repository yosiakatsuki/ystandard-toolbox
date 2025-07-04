import { __ } from '@wordpress/i18n';

/**
 * ブロッククラス名
 */
export const blockClassName = 'ystdtb-box';

/**
 * ボックススタイル選択肢
 */
export const boxStyleList = [
	{ value: 'label-none', label: __( 'ラベル無し', 'ystandard-toolbox' ) },
	{ value: 'label-out', label: __( '外側ラベル', 'ystandard-toolbox' ) },
	{ value: 'label-in', label: __( '内側ラベル', 'ystandard-toolbox' ) },
	{ value: 'label-wide', label: __( '全幅ラベル', 'ystandard-toolbox' ) },
	{ value: 'label-line', label: __( '線上ラベル', 'ystandard-toolbox' ) },
];

/**
 * 単位選択肢
 */
export const units = [
	{ value: 'px', label: 'px' },
	{ value: 'em', label: 'em' },
	{ value: '%', label: '%' },
];

/**
 * ボーダースタイル選択肢
 */
export const borderStyles = [
	{ value: 'solid', label: __( '直線', 'ystandard-toolbox' ) },
	{ value: 'dotted', label: __( '点線', 'ystandard-toolbox' ) },
	{ value: 'dashed', label: __( '破線', 'ystandard-toolbox' ) },
	{ value: 'double', label: __( '二重線', 'ystandard-toolbox' ) },
];

/**
 * フォントウェイト選択肢
 */
export const fontWeightList = [
	{ value: 'normal', label: __( '通常', 'ystandard-toolbox' ) },
	{ value: 'bold', label: __( '太字', 'ystandard-toolbox' ) },
];