/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import type { SliderItemEditProps } from '../types';
import { Overflow } from './styles/overflow';

export function InspectorControls( props: SliderItemEditProps ): JSX.Element {
	return (
		<WPInspectorControls group="styles">
			<Overflow { ...props } />
		</WPInspectorControls>
	);
}
