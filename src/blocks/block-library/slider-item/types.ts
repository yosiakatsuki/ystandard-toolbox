/* WordPress Dependencies */
import type { BlockSaveProps } from '@wordpress/blocks';

export interface SliderItemEditProps {
	attributes: SliderItemBlockAttributes;
	setAttributes: ( attributes: Partial< SliderItemBlockAttributes > ) => void;
	clientId: string;
	isSelected: boolean;
}

export type SliderItemSaveProps = BlockSaveProps< SliderItemBlockAttributes >;

/**
 * スライダーアイテムの属性型定義
 */
export interface SliderItemBlockAttributes {
	style?: SliderItemStyle;
}

/**
 * スライダーアイテムのスタイル属性。標準サポートの値と独自スタイルを持つ。
 */
export interface SliderItemStyle {
	dimensions?: {
		height?: string;
	};
	ystdtb?: {
		sliderItem?: {
			overflow?: SliderItemOverflow;
		};
	};
	[ key: string ]: unknown;
}

/**
 * はみ出した部分の扱い。hidden: はみ出した部分を隠す。
 */
export type SliderItemOverflow = 'hidden';
