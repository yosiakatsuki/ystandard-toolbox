/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies
 */
import { Design } from './design';
import { FAQLabel } from './faq-label';

// @ts-ignore.
export function InspectorControls( props ): JSX.Element {
	return (
		<WPInspectorControls>
			<Design { ...props } />
			<FAQLabel { ...props } />
		</WPInspectorControls>
	);
}
