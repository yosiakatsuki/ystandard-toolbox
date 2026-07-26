/**
 * TypeScript型定義 - インラインフォーマット：レスポンシブ改行
 */

import type { Icon } from 'react-feather';

/* WordPress Dependencies */
import type { RichTextValue } from '@wordpress/rich-text';

/**
 * レスポンシブ改行の定義
 */
export interface ResponsiveBreak {
	/** フォーマット名 */
	name: string;
	/** 保存されるCSSクラス名 */
	className: string;
	/** ツールバーに表示するラベル */
	title: string;
	/** ツールバーに表示するアイコン */
	icon: Icon;
}

/**
 * フォーマットのeditコンポーネントに渡されるプロパティ
 */
export interface FormatEditProps {
	/** RichText全体の値 */
	value: RichTextValue;
	/** RichTextの値を更新する関数 */
	onChange: ( value: RichTextValue ) => void;
}
