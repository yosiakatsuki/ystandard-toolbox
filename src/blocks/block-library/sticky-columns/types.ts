/* WordPress Dependencies */
import type { BlockEditProps } from '@wordpress/blocks';

export type StickyColumn = 'first' | 'second' | 'none';

export type StickyColumnsAttributes = {
	collapseAt: 'container' | 'mobile' | 'tablet';
	containerSize?: string;
	reverse: boolean;
	stickyColumn: StickyColumn;
	style?: { ystdtb?: { stickyColumns?: { stickyOffset?: string } } };
};

export type StickyColumnsEditProps = BlockEditProps< StickyColumnsAttributes >;
