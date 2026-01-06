/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import type { TimeLineInspectorProps } from '../types';
import { BulkSettings } from '@aktk/blocks/block-library/timeline/inspector-controls/bulk-settings';

// @ts-ignore.
export function InspectorControls(
	props: TimeLineInspectorProps
): JSX.Element {
	return (
		<WPInspectorControls>
			<BulkSettings { ...props } />
		</WPInspectorControls>
	);
}
