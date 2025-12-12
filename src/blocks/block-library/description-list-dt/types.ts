/**
 * Aktk Dependencies.
 */
import type {
	ResponsiveSpacing,
	Spacing,
} from '@aktk/block-components/components/custom-spacing-select';
import type { ResponsiveFontSize } from '@aktk/block-components/components/custom-font-size-picker';

export interface DtBlockAttributes {
	text?: string;
	backgroundColor?: string;
	customBackgroundColor?: string;
	gradient?: string;
	customGradient?: string;
	textColor?: string;
	customTextColor?: string;
	textSize?: string;
	customTextSize?: string;
	responsiveTextSize?: ResponsiveFontSize;
	fontWeight?: string;
	fontStyle?: string;
	lineHeight?: string;
	letterSpacing?: string;
	padding?: Spacing;
	responsivePadding?: ResponsiveSpacing;
	margin?: Spacing;
	responsiveMargin?: ResponsiveSpacing;
}

export interface DtBlockProps {
	attributes: DtBlockAttributes;
	setAttributes: ( attributes: DtBlockAttributes ) => void;
	className?: string;
	clientId: string;
	isSelected: boolean;
	name?: string;
}
