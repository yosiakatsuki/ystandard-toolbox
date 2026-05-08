import type { ResponsiveValues } from '@aktk/block-components/types';
import type {
	Spacing,
	ResponsiveSpacing,
} from '@aktk/block-components/components/custom-spacing-select';
import type {
	SplitBorders,
	FlatBorder,
} from '@aktk/block-components/components/custom-border-select';

/**
 * 見出しデザイン編集設定
 */
export type HeadingOptions = {
	[ name: string ]: HeadingOption;
};

/**
 * 見出し設定1つの設定内容
 */
export interface HeadingOption {
	slug: string;
	label: string;
	useHeadingStyle?: boolean;
	useParagraphStyle?: boolean;
	style: HeadingStyle;
	before?: HeadingPseudoElementsStyle;
	after?: HeadingPseudoElementsStyle;
}

/**
 * [style]属性の設定内容
 */
export interface HeadingStyle {
	// typography.
	fontSize?: CustomFontSize;
	color?: string;
	textAlign?: string;
	responsiveTextAlign?: ResponsiveValues;
	fontWeight?: string;
	responsiveFontWeight?: ResponsiveValues;
	fontStyle?: string;
	lineHeight?: string;
	letterSpacing?: string;
	textDecoration?: string;

	// Background.
	backgroundColor?: string;
	backgroundGradient?: string; //未対応.
	backgroundImage?: string;
	backgroundPosition?: string;
	backgroundRepeat?: string;
	backgroundSize?: string;

	// Border.
	border?: SplitBorders | FlatBorder;
	borderRadius?: string;
	responsiveBorderRadius?: ResponsiveValues;

	// Spacing.
	padding?: Spacing;
	responsivePadding?: ResponsiveSpacing;
	margin?: ResponsiveSpacing;

	// Size.
	width?: string;
	responsiveWidth?: ResponsiveValues;
	minWidth?: string;
	responsiveMinWidth?: ResponsiveValues;
	maxWidth?: string;
	responsiveMaxWidth?: ResponsiveValues;
	height?: string;
	responsiveHeight?: ResponsiveValues;
	minHeight?: string;
	responsiveMinHeight?: ResponsiveValues;
	maxHeight?: string;
	responsiveMaxHeight?: ResponsiveValues;

	// advanced.
	display?: string;
	responsiveDisplay?: ResponsiveValues;
	flexDirection?: string;
	responsiveFlexDirection?: ResponsiveValues;
	alignItems?: string;
	responsiveAlignItems?: ResponsiveValues;
	justifyContent?: string;
	responsiveJustifyContent?: ResponsiveValues;
	gap?: string;
	responsiveGap?: ResponsiveValues;
	position?: string;
	top?: string;
	right?: string;
	bottom?: string;
	left?: string;
	zIndex?: string;
	fontFamily?: string;
	background?: string;
	textShadow?: string;
	boxShadow?: string;
	customCss?: string;
}

/**
 * [before][after]属性の設定内容
 */
export interface HeadingPseudoElementsStyle {
	enable?: boolean;
	content?: string;
	icon?: string;
	iconColor?: string;
	useIconMask?: boolean;
	fontSize?: ResponsiveValues;
	color?: string;
	fontWeight?: string;
	responsiveFontWeight?: ResponsiveValues;
	fontStyle?: string;
	lineHeight?: string;
	letterSpacing?: string;
	textDecoration?: string;
	// Background.
	backgroundColor?: string;
	backgroundGradient?: string;
	backgroundImage?: string;
	backgroundPosition?: string;
	backgroundRepeat?: string;
	backgroundSize?: string;
	// Border.
	border?: SplitBorders | FlatBorder;
	borderRadius?: string;
	responsiveBorderRadius?: ResponsiveValues;
	// Spacing.
	padding?: Spacing;
	responsivePadding?: ResponsiveSpacing;
	margin?: ResponsiveSpacing;
	// Size.
	width?: string;
	responsiveWidth?: ResponsiveValues;
	minWidth?: string;
	responsiveMinWidth?: ResponsiveValues;
	maxWidth?: string;
	responsiveMaxWidth?: ResponsiveValues;
	height?: string;
	responsiveHeight?: ResponsiveValues;
	minHeight?: string;
	responsiveMinHeight?: ResponsiveValues;
	maxHeight?: string;
	responsiveMaxHeight?: ResponsiveValues;
	// advanced.
	background?: string;
	display?: string;
	responsiveDisplay?: ResponsiveValues;
	textShadow?: string;
	boxShadow?: string;
	fontFamily?: string;
	//system.
	verticalAlign?: string;
	// 保留.
	flexGrow?: string;
	flexShrink?: string;
	position?: string;
	top?: string;
	right?: string;
	bottom?: string;
	left?: string;
	zIndex?: string;
	// アイコン関連の設定.
	maskImage?: string;
	'-webkit-mask-image'?: string;
	maskPosition?: string;
	maskSize?: string;
	maskRepeat?: string;
}

export interface LevelList {
	[ key: string ]: string;
}

export interface CustomFontSize {
	desktop?: string;
	tablet?: string;
	mobile?: string;
	fontSize?: {
		size?: number | string;
		slug?: string;
		name?: string;
	};
}
