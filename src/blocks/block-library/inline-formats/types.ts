/**
 * TypeScript型定義 - インラインフォーマット共通
 */

import type { ComponentType, CSSProperties } from 'react';

/* WordPress Dependencies */
import type { RichTextValue } from '@wordpress/rich-text';

/**
 * インラインフォーマットの定義
 */
export interface InlineFormat {
	/** フォーマット名 */
	name: string;
	/** 保存されるCSSクラス名 */
	className: string;
	/** ツールバーに表示するラベル */
	title: string;
	/** エディター内で内容を直接編集できるか */
	contentEditable?: boolean;
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

/**
 * ツールバーに表示するアイコンコンポーネント
 */
export type FormatToolbarIcon = ComponentType< { style?: CSSProperties } >;

/**
 * 共通ツールバーに表示する項目
 */
export interface FormatToolbarControl {
	/** 項目のラベル */
	title: string;
	/** 項目のアイコン */
	icon: FormatToolbarIcon;
	/** 項目を選択したときの処理 */
	onClick: () => void;
}

/**
 * 共通ツールバーに項目を追加するグループ
 *
 * 機能ごとに1グループを定義し、ドロップダウン内では区切って表示される.
 */
export interface FormatToolbarGroup {
	/** グループ名 */
	name: string;
	/** ツールバーに表示する項目を作る */
	getControls: ( props: FormatEditProps ) => FormatToolbarControl[];
}
