/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';
/**
 * Block Dependencies.
 */
import { Background } from './background';
import { Typography } from './typography';
import { Spacing } from './spacing';

// @ts-ignore.
export function InspectorControls( props ): JSX.Element {
	return (
		<WPInspectorControls>
			<Background { ...props } />
			<Typography { ...props } />
			<Spacing { ...props } />
		</WPInspectorControls>
	);
}
