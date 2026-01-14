/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import type { TimeLineItemProps } from '../types';
import { Timeline } from './timeline';
import { Label } from './label';

// @ts-ignore.
export function InspectorControls( props: TimeLineItemProps ): JSX.Element {
	return (
		<WPInspectorControls>
			<Timeline { ...props } />
			<Label { ...props } />
		</WPInspectorControls>
	);
}
