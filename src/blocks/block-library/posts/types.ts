/**
 * 記事一覧ブロック型定義
 */

/**
 * デザインタイプ
 */
export type ListType = 'card' | 'list' | 'simple';

/**
 * 並び順フィールド
 */
export type OrderBy = 'date' | 'modified' | 'title' | 'rand';

/**
 * ソート方向
 */
export type Order = 'ASC' | 'DESC';

/**
 * サムネイルアスペクト比
 */
export type ThumbnailRatio =
	| '16-9'
	| '4-3'
	| '3-2'
	| '1-1'
	| '2-1'
	| '3-1'
	| '9-16'
	| '4-5'
	| '2-3';

/**
 * 記事一覧ブロック属性
 */
export interface PostsBlockAttributes {
	// 基本設定.
	count: number;
	countMobile?: number;
	orderby: OrderBy;
	order: Order;

	// 表示設定.
	listType: ListType;
	listTypeMobile?: string;
	colMobile: number;
	colTablet: number;
	colPc: number;

	// 絞り込み.
	taxonomy?: string;
	termSlug?: string;

	// サムネイル.
	showImg: boolean;
	thumbnailSize: string;
	thumbnailRatio: ThumbnailRatio;
	thumbnailRatioMobile: ThumbnailRatio;

	// メタ情報.
	showDate: boolean;
	showCategory: boolean;
	showExcerpt: boolean;
	excerptLines?: number;

	// 投稿タイプ・高度な絞り込み.
	postType: string;
	postIn?: string;
	postNameIn?: string;
	postParent?: string;

	// 高度な表示.
	offset?: number;
	offsetMobile?: number;
}

/**
 * 記事一覧ブロック編集プロパティ
 */
export interface PostsEditProps {
	attributes: PostsBlockAttributes;
	setAttributes: ( attributes: Partial< PostsBlockAttributes > ) => void;
	className?: string;
	clientId: string;
	isSelected: boolean;
}
