export interface SliderItemEditProps {
	attributes: SliderItemBlockAttributes;
	setAttributes: ( attributes: Partial< SliderItemBlockAttributes > ) => void;
	clientId: string;
	isSelected: boolean;
}

/**
 * スライダーブロックの属性型定義
 */
export interface SliderItemBlockAttributes {}
