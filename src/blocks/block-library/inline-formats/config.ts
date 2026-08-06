/**
 * 設定 - インラインフォーマット共通
 *
 * インラインフォーマットを追加する場合は、機能ごとのディレクトリを作り
 * INLINE_FORMATS と FORMAT_TOOLBAR_GROUPS に追加する.
 */

import type { CSSProperties } from 'react';

/* Block Dependencies */
import { RESPONSIVE_BREAKS } from './responsive-br/config';
import { RESPONSIVE_BR_TOOLBAR_GROUP } from './responsive-br/controls';
import type { FormatToolbarGroup, InlineFormat } from './types';

/**
 * フォーマットのタグ名
 */
export const FORMAT_TAG_NAME = 'span';

/**
 * 登録するインラインフォーマット
 */
export const INLINE_FORMATS: InlineFormat[] = [ ...RESPONSIVE_BREAKS ];

/**
 * 共通ツールバーに表示するグループ
 */
export const FORMAT_TOOLBAR_GROUPS: FormatToolbarGroup[] = [
	RESPONSIVE_BR_TOOLBAR_GROUP,
];

/**
 * 線画アイコン用のスタイル
 *
 * WordPressの `.components-button svg { fill: currentColor; }` により
 * 線画アイコンが塗りつぶされてしまうため、インラインスタイルで打ち消す.
 */
export const LINE_ICON_STYLE: CSSProperties = {
	fill: 'none',
	width: 20,
	height: 20,
};
