/**
 * Aktk Dependencies.
 */
import type { ResponsiveSpacing } from '@aktk/block-components/components/custom-spacing-select';

export interface DtBlockAttributes {
	margin?: ResponsiveSpacing;
}

export interface DtBlockProps {
	attributes: DtBlockAttributes;
	setAttributes: ( attributes: DtBlockAttributes ) => void;
	className?: string;
	clientId: string;
	isSelected: boolean;
	name?: string;
}
