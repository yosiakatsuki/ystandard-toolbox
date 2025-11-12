/**
 * WordPress dependencies.
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import type { IconListEditProps } from '../types';
import { Icon } from './icon';

// @ts-ignore.
export function InspectorControls( props: IconListEditProps ): JSX.Element {
	return (
		<WPInspectorControls>
			<Icon { ...props } />
		</WPInspectorControls>
	);
}
