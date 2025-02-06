import type { ResponsiveValues } from '@aktk/block-components/types';
import type { CustomSpacing } from '@aktk/block-components/components/custom-spacing-select';
import type { CustomFontSize } from '@aktk/block-components/components/custom-font-size-picker';
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
	enable: boolean;
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
	textAlign?: ResponsiveValues;
	fontWeight?: ResponsiveValues;
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
	borderRadius?: ResponsiveValues;

	// Spacing.
	padding?: CustomSpacing;
	margin?: CustomSpacing;

	// Size.
	width?: ResponsiveValues;
	minWidth?: ResponsiveValues;
	maxWidth?: ResponsiveValues;
	height?: ResponsiveValues;
	minHeight?: ResponsiveValues;
	maxHeight?: ResponsiveValues;

	// advanced.
	display?: ResponsiveValues;
	flexDirection?: ResponsiveValues;
	alignItems?: ResponsiveValues;
	justifyContent?: ResponsiveValues;
	gap?: ResponsiveValues;
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
	content?: string;
	icon?: string;
	useIconMask?: boolean;
	fontSize?: ResponsiveValues;
	color?: string;
	fontWeight?: ResponsiveValues;
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
	borderRadius?: ResponsiveValues;
	// Spacing.
	padding?: CustomSpacing;
	margin?: CustomSpacing;
	// Size.
	width?: ResponsiveValues;
	minWidth?: ResponsiveValues;
	maxWidth?: ResponsiveValues;
	height?: ResponsiveValues;
	minHeight?: ResponsiveValues;
	maxHeight?: ResponsiveValues;
	// advanced.
	background?: string;
	display?: ResponsiveValues;
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
}

export interface LevelList {
	[ key: string ]: string;
}
