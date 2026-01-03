/**
 * Aktk Dependencies.
 */
import type {
	ResponsiveSpacing,
	Spacing,
} from '@aktk/block-components/components/custom-spacing-select';

export interface DdBoxBlockAttributes {
	backgroundColor?: string;
	customBackgroundColor?: string;
	gradient?: string;
	customGradient?: string;
	textColor?: string;
	customTextColor?: string;
	padding?: Spacing;
	responsivePadding?: ResponsiveSpacing;
	margin?: Spacing;
	responsiveMargin?: ResponsiveSpacing;
}

export interface DdBoxBlockProps {
	attributes: DdBoxBlockAttributes;
	setAttributes: ( attributes: DdBoxBlockAttributes ) => void;
	className?: string;
	clientId: string;
	isSelected: boolean;
	name?: string;
	gradientClass?: string;
	gradientValue?: string;
	setGradient?: ( gradientValue: string ) => void;
}
