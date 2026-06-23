/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import { FaqOption } from './faq-option';

// @ts-ignore.
export function InspectorControls( props ): JSX.Element {
	return (
		<WPInspectorControls>
			<FaqOption { ...props } />
		</WPInspectorControls>
	);
}
