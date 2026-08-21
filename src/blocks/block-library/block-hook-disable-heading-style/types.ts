/* WordPress Dependencies */
import type { BlockConfiguration } from '@wordpress/blocks';

/**
 * 見出しデザイン無効化で使用するブロック属性。
 */
export interface DisableHeadingStyleAttributes {
	/** 追加CSSクラス。 */
	className?: string;
}

/**
 * ブロック編集コンポーネントのプロパティ。
 */
export interface BlockEditProps {
	/** ブロック属性。 */
	attributes: DisableHeadingStyleAttributes;
	/** 属性更新関数。 */
	setAttributes: (
		attributes: Partial< DisableHeadingStyleAttributes >
	) => void;
	/** ブロック名。 */
	name: string;
}

/**
 * ブロックリストコンポーネントのプロパティ。
 */
export interface BlockListBlockProps {
	/** ブロック属性。 */
	attributes: DisableHeadingStyleAttributes;
	/** エディター上のCSSクラス。 */
	className?: string;
	/** ブロック名。 */
	name: string;
}

/**
 * ブロック設定拡張の型定義。
 */
export interface ExtendedBlockConfiguration extends BlockConfiguration {
	attributes: Record< string, any >;
}
