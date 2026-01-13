/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { Panel } from '@aktk/block-components/components/panel';
/**
 * Block dependencies.
 */
import type { TimeLineItemProps } from '../../types';
import { ContentsSpacing } from '@aktk/blocks/block-library/timeline-item/inspector-controls/timeline/contents-spacing';
import { BorderColor } from '@aktk/blocks/block-library/timeline-item/inspector-controls/timeline/border-color';
import { Margin } from '@aktk/blocks/block-library/timeline-item/inspector-controls/timeline/margin';

export function Timeline( props: TimeLineItemProps ): JSX.Element {
	return (
		<Panel title={ __( 'タイムライン', 'ystandard-toolbox' ) }>
			<ContentsSpacing { ...props } />
			<BorderColor { ...props } />
			<Margin { ...props } />
		</Panel>
	);
}
