/**
 * TypeScript型定義 - ブロック拡張：画面サイズによる非表示機能
 */

// WordPress Dependencies
import type { BlockConfiguration } from '@wordpress/blocks';

/**
 * 画面サイズによる非表示機能の属性型定義
 */
export interface HiddenBySizeAttributes {
	/** モバイルで非表示 */
	ystdtbIsHiddenMobile: boolean;
	/** タブレットで非表示 */
	ystdtbIsHiddenTablet: boolean;
	/** デスクトップで非表示 */
	ystdtbIsHiddenDesktop: boolean;
	/** CSSクラス名 */
	className?: string;
}

/**
 * ブロック編集プロパティの型定義
 */
export interface BlockEditProps {
	/** ブロック属性 */
	attributes: HiddenBySizeAttributes;
	/** 属性更新関数 */
	setAttributes: (attributes: Partial<HiddenBySizeAttributes>) => void;
	/** ブロック名 */
	name: string;
}

/**
 * フック有効性判定の型定義
 */
export interface HookEnableOptions {
	/** ブロック名 */
	blockName: string;
	/** フック名 */
	hookName: string;
	/** 無効化するブロック一覧 */
	disableBlocks?: string[];
}

/**
 * パネル用CSSクラス名生成の型定義
 */
export interface PanelClassNameOptions {
	/** フック名 */
	hookName: string;
	/** 有効化状態 */
	isEnabled?: boolean;
}

/**
 * ブロック設定拡張の型定義
 */
export interface ExtendedBlockConfiguration extends BlockConfiguration {
	attributes: Record<string, any>;
}