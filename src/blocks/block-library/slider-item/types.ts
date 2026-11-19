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
	style?: {
		dimensions?: {
			height?: string;
		};
	};
}
