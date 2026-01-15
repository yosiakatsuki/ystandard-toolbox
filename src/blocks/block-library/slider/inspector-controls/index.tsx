/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import type { SliderEditProps } from '../types';

// @ts-ignore.
export function InspectorControls( props: SliderEditProps ): JSX.Element {
	return (
		<WPInspectorControls>
			<></>
		</WPInspectorControls>
	);
}
