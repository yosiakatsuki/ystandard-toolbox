/* WordPress Dependencies */
import type { BlockEditProps } from '@wordpress/blocks';

export type StickyColumn = 'first' | 'second' | 'none';

export type StickyColumnsAttributes = {
	reverse: boolean;
	stickyColumn: StickyColumn;
};

export type StickyColumnsEditProps = BlockEditProps< StickyColumnsAttributes >;
