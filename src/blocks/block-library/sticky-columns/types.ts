/* WordPress Dependencies */
import type { BlockEditProps } from '@wordpress/blocks';

/* Aktk Dependencies */
import type { ResponsiveGap } from '@aktk/block-components/components/responsive-spacing-panel';

export type StickyColumn = 'first' | 'second' | 'none';

export type StickyColumnsAttributes = {
	collapseAt: 'container' | 'mobile' | 'tablet';
	containerSize?: string;
	reverse: boolean;
	stickyColumn: StickyColumn;
	style?: {
		spacing?: { blockGap?: string | { top?: string; left?: string } };
		ystdtb?: {
			stickyColumns?: {
				stickyOffset?: string;
				responsive?: { blockGap?: ResponsiveGap };
			};
		};
	};
};

export type StickyColumnsEditProps = BlockEditProps< StickyColumnsAttributes >;
