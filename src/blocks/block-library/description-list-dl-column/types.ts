/**
 * Aktk Dependencies.
 */
import type {
	ResponsiveSpacing,
	Spacing,
} from '@aktk/block-components/components/custom-spacing-select';
import type { ResponsiveValues } from '@aktk/block-components/types';
import type { FlatBorder } from '@aktk/block-components/components/custom-border-select';

export interface DlColumnBlockAttributes {
	isStackedOnMobile?: boolean;
	isStackedOnTablet?: boolean;
	dtWidth?: ResponsiveValues;
	border?: FlatBorder;
	margin?: Spacing;
	responsiveMargin?: ResponsiveSpacing;
}

export interface DlColumnBlockProps {
	attributes: DlColumnBlockAttributes;
	setAttributes: ( attributes: DlColumnBlockAttributes ) => void;
	className?: string;
	clientId: string;
	isSelected: boolean;
	name?: string;
}
