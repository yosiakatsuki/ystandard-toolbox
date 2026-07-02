/**
 * Aktk Dependencies.
 */
import type { ResponsiveSpacing } from '@aktk/block-components/components/custom-spacing-select';

/**
 * カラーオブジェクト
 */
export interface ColorObject {
	color?: string;
	name?: string;
	slug?: string;
}

/**
 * ブロックオプション属性
 */
export interface IconListAttributes {
	iconType?: string;
	customIconClass?: string;
	iconBold?: boolean;
	boxTextColor?: string;
	iconColor?: string;
	customIconColor?: string;
	responsiveMargin?: ResponsiveSpacing;
	responsivePadding?: ResponsiveSpacing;
}

/**
 * ブロック編集プロパティ
 */
export interface IconListEditProps {
	attributes: IconListAttributes;
	setAttributes: ( attributes: Partial< IconListAttributes > ) => void;
	className?: string;
	clientId: string;
	isSelected: boolean;
	// HOC由来プロパティ
	iconColor: ColorObject;
	setIconColor: ( color: string | undefined ) => void;
}
