import { __ } from '@wordpress/i18n';
import type { BorderTypeOption } from './types';

/**
 * FAQブロックのボーダータイプ選択肢
 */
export const faqBorderTypes: BorderTypeOption[] = [
	{ label: __( 'なし', 'ystandard-toolbox' ), name: '' },
	{ label: __( '上下左右', 'ystandard-toolbox' ), name: 'all' },
	{ label: __( '下のみ', 'ystandard-toolbox' ), name: 'bottom' },
];

/**
 * FAQブロックの初期テンプレート
 */
export const template: [ string, Record< string, any > ][] = [
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
