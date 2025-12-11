/**
 * Aktk Dependencies.
 */
import type {
	ResponsiveSpacing,
	Spacing,
} from '@aktk/block-components/components/custom-spacing-select';

export interface DlBlockAttributes {
	margin?: Spacing;
	responsiveMargin?: ResponsiveSpacing;
}

export interface DlBlockProps {
	attributes: DlBlockAttributes;
	setAttributes: ( attributes: DlBlockAttributes ) => void;
	className?: string;
	clientId: string;
	isSelected: boolean;
	name?: string;
}
