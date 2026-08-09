/**
 * TypeScript型定義 - レスポンシブ改行
 */

/* Block Dependencies */
import type { FormatToolbarIcon, InlineFormat } from '../types';

/**
 * レスポンシブ改行の定義
 */
export interface ResponsiveBreak extends InlineFormat {
	/** ツールバーに表示するアイコン */
	icon: FormatToolbarIcon;
}
