/**
 * WordPress dependencies.
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import type { IconListEditProps } from '../types';
import { Icon } from './icon';
import { Typography } from './typography';
import { Spacing } from './spacing';

// @ts-ignore.
export function InspectorControls( props: IconListEditProps ): JSX.Element {
	return (
		<>
			<WPInspectorControls>
				<Icon { ...props } />
			</WPInspectorControls>
			<WPInspectorControls group="styles">
				<Typography { ...props } />
				<Spacing { ...props } />
			</WPInspectorControls>
		</>
	);
}
