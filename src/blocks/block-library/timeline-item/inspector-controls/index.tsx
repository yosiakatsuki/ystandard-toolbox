/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import { Timeline } from '@aktk/blocks/block-library/timeline-item/inspector-controls/timeline';
import type { TimeLineItemProps } from '../types';

// @ts-ignore.
export function InspectorControls( props: TimeLineItemProps ): JSX.Element {
	return (
		<WPInspectorControls>
			<Timeline { ...props } />
		</WPInspectorControls>
	);
}
