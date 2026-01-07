/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import type { TimeLineInspectorProps } from '../types';
import { BulkContents } from './bulk-contents';
import { BulkLabel } from './bulk-label';

// @ts-ignore.
export function InspectorControls(
	props: TimeLineInspectorProps
): JSX.Element {
	return (
		<WPInspectorControls>
			<BulkContents { ...props } />
			<BulkLabel { ...props } />
		</WPInspectorControls>
	);
}
