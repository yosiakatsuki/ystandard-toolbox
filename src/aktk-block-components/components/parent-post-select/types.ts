export interface PostRecord {
	id: number;
	parent: number;
	title: {
		rendered: string;
	};
}

export interface ParentPostSelectProps {
	/** 現在選択されている親投稿のID（文字列） */
	value: string;
	/** 値変更時のコールバック */
	onChange: ( id: string ) => void;
	/** 対象の投稿タイプスラッグ（未指定・空文字、または非階層型の場合は空選択肢のみ表示） */
	postType?: string;
	/** ラベル */
	label?: string;
	/** 空選択肢を表示するか */
	useEmptyValue?: boolean;
	/** 空選択肢のラベル */
	emptyLabel?: string;
	/** 選択肢がない場合に表示するラベル */
	noOptionsLabel?: string;
	/** 無効状態 */
	disabled?: boolean;
}
