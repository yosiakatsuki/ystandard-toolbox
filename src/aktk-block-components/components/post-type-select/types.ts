import type { Type } from '@wordpress/core-data';

/**
 * getPostTypes()が返す投稿タイプレコードの型
 */
export type PostTypeRecord = Type< 'edit' >;

export interface PostTypeSelectProps {
	/** 現在選択されている投稿タイプのスラッグ */
	value: string;
	/** 値変更時のコールバック */
	onChange: ( slug: string ) => void;
	/** ラベル */
	label?: string;
	/** 除外する投稿タイプスラッグの配列 */
	excludeSlugs?: string[];
	/** 追加のフィルタ関数 */
	filter?: ( postType: PostTypeRecord ) => boolean;
	/** 空選択肢を表示するか */
	useEmptyValue?: boolean;
	/** 空選択肢のラベル */
	emptyLabel?: string;
	/** 無効状態 */
	disabled?: boolean;
}
