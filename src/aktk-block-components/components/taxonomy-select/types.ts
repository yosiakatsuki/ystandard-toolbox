import type { Taxonomy } from '@wordpress/core-data';

/**
 * getTaxonomies()が返すタクソノミーレコードの型
 */
export type TaxonomyRecord = Taxonomy< 'edit' >;

export interface TaxonomySelectProps {
	/** 現在選択されているタクソノミーのスラッグ */
	value: string;
	/** 値変更時のコールバック */
	onChange: ( slug: string ) => void;
	/** フィルタ対象の投稿タイプスラッグ（未指定・空文字時は空選択肢のみ表示） */
	postType?: string;
	/** ラベル */
	label?: string;
	/** 除外するタクソノミースラッグの配列 */
	excludeSlugs?: string[];
	/** 追加のフィルタ関数 */
	filter?: ( taxonomy: TaxonomyRecord ) => boolean;
	/** 空選択肢を表示するか */
	useEmptyValue?: boolean;
	/** 空選択肢のラベル */
	emptyLabel?: string;
	/** 選択肢がない場合に表示するラベル */
	noOptionsLabel?: string;
	/** 無効状態 */
	disabled?: boolean;
}
