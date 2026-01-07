/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import type { TimeLineInspectorProps } from '../types';
import { BulkContents } from '@aktk/blocks/block-library/timeline/inspector-controls/bulk-contents';

// @ts-ignore.
export function InspectorControls(
	props: TimeLineInspectorProps
): JSX.Element {
	return (
		<WPInspectorControls>
			<BulkContents { ...props } />
		</WPInspectorControls>
	);
}
