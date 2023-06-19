import type { ResponsiveSpacing } from '@aktk/components/responsive-spacing';
import type { ResponsiveValues } from '@aktk/components/responsive-values';
import type { ResponsiveBorder } from '@aktk/components/responsive-border';

export type HeadingOptions = {
	[ name: string ]: HeadingOption;
};

export interface HeadingOption {
	slug: string;
	label: string;
	enable: boolean;
	enableParagraph?: boolean;
	style: HeadingStyle;
	before?: HeadingPseudoElementsStyle;
	after?: HeadingPseudoElementsStyle;
}

export interface HeadingStyle {
	// typography.
	fontSize?: ResponsiveValues;
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
	margin?: ResponsiveSpacing;
	padding?: ResponsiveSpacing;

	// Border.
	border?: ResponsiveBorder;
	borderRadius?: ResponsiveValues;

	// Size.
	minWidth?: ResponsiveValues;
	maxWidth?: ResponsiveValues;
	minHeight?: ResponsiveValues;
	maxHeight?: ResponsiveValues;

	// advanced.
	display?: string;
	gap?: ResponsiveValues;
	flexDirection?: string;
	fontFamily?: string;
	customCss?: string;
}

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
	margin?: ResponsiveSpacing;
	padding?: ResponsiveSpacing;
	// Border.
	border?: ResponsiveBorder;
	borderRadius?: ResponsiveValues;
	// Size.
	minWidth?: ResponsiveValues;
	maxWidth?: ResponsiveValues;
	minHeight?: ResponsiveValues;
	maxHeight?: ResponsiveValues;
	// advanced.
	display?: string;
	fontFamily?: string;
	customCss?: string;
}
