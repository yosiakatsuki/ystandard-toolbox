/**
 * 設定 - インラインフォーマット：レスポンシブ改行
 */

import { Monitor, Smartphone, Tablet } from 'react-feather';

/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Block Dependencies */
import type { ResponsiveBreak } from './types';

/**
 * レスポンシブ改行の定義
 *
 * className は保存されるHTMLに残るため、後方互換のため変更しない.
 */
export const RESPONSIVE_BREAKS: ResponsiveBreak[] = [
	{
		name: 'ystdtb/br-mobile',
		className: 'ystdtb-br--mobile',
		title: __( 'モバイルのみ改行', 'ystandard-toolbox' ),
		icon: Smartphone,
	},
	{
		name: 'ystdtb/br-tablet',
		className: 'ystdtb-br--tablet',
		title: __( 'タブレットのみ改行', 'ystandard-toolbox' ),
		icon: Tablet,
	},
	{
		name: 'ystdtb/br-desktop',
		className: 'ystdtb-br--desktop',
		title: __( 'PCのみ改行', 'ystandard-toolbox' ),
		icon: Monitor,
	},
];

/**
 * フォーマットのタグ名
 */
export const FORMAT_TAG_NAME = 'span';
