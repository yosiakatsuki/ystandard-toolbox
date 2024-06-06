import type { ResponsiveValues } from '@aktk/block-components/types';
import type { CustomSpacing } from 'src/aktk-block-components/components/custom-spacing-select';
import type { CustomFontSize } from 'src/aktk-block-components/components/custom-font-size-picker';
import type { CustomBorder } from '@aktk/block-components/components/custom-border-select/types';

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
	enableParagraph?: boolean;
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
	backgroundImage?: string;
	backgroundPosition?: string;
	backgroundRepeat?: string;
	backgroundSize?: string;

	// Spacing.
	margin?: CustomSpacing;
	padding?: CustomSpacing;

	// Border.
	border?: CustomBorder;
	borderRadius?: ResponsiveValues;

	// Size.
	width?: ResponsiveValues;
	minWidth?: ResponsiveValues;
	maxWidth?: ResponsiveValues;
	height?: ResponsiveValues;
	minHeight?: ResponsiveValues;
	maxHeight?: ResponsiveValues;

	// advanced.
	background?: string;
	display?: string;
	gap?: ResponsiveValues;
	flexDirection?: string;
	alignItems?: string;
	justifyContent?: string;
	fontFamily?: string;
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
	fontSize?: ResponsiveValues;
	color?: string;
	fontWeight?: string;
	fontStyle?: string;
	lineHeight?: string;
	letterSpacing?: string;
	textDecoration?: string;
	// Background.
	backgroundColor?: string;
	backgroundImage?: string;
	backgroundPosition?: string;
	backgroundRepeat?: string;
	backgroundSize?: string;
	// Spacing.
	margin?: CustomSpacing;
	padding?: CustomSpacing;
	// Border.
	border?: CustomBorder;
	borderRadius?: ResponsiveValues;
	// Size.
	width?: ResponsiveValues;
	minWidth?: ResponsiveValues;
	maxWidth?: ResponsiveValues;
	height?: ResponsiveValues;
	minHeight?: ResponsiveValues;
	maxHeight?: ResponsiveValues;
	// advanced.
	background?: string;
	display?: string;
	flexGrow?: string;
	flexShrink?: string;
	position?: string;
	top?: string;
	right?: string;
	bottom?: string;
	left?: string;
	zIndex?: string;
	fontFamily?: string;
	customCss?: string;
}
