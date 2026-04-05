import type { Term, Taxonomy } from '@wordpress/core-data';

/**
 * getEntityRecords()が返すタームレコードの型
 */
export type TermRecord = Term< 'edit' >;

/**
 * getTaxonomy()が返すタクソノミーレコードの型
 */
export type TaxonomyRecord = Taxonomy< 'edit' >;

export interface TermSelectProps {
	/** 現在選択されているタームのスラッグ */
	value: string;
	/** 値変更時のコールバック */
	onChange: ( slug: string ) => void;
	/** 対象タクソノミーのスラッグ（未指定・空文字時は空選択肢のみ表示） */
	taxonomy?: string;
	/** ラベル */
	label?: string;
	/** 除外するタームスラッグの配列 */
	excludeSlugs?: string[];
	/** 追加のフィルタ関数 */
	filter?: ( term: TermRecord ) => boolean;
	/** 空選択肢を表示するか */
	useEmptyValue?: boolean;
	/** 空選択肢のラベル */
	emptyLabel?: string;
	/** 選択肢がない場合に表示するラベル */
	noOptionsLabel?: string;
	/** 無効状態 */
	disabled?: boolean;
}
