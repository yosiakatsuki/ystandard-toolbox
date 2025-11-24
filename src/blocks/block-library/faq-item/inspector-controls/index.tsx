/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies
 */
import { Design } from './design';
import { FAQLabel } from './faq-label';
import { FaqContents } from './faq-contents';

// @ts-ignore.
export function InspectorControls( props ): JSX.Element {
	return (
		<WPInspectorControls>
			<Design { ...props } />
			<FAQLabel { ...props } />
			<FaqContents { ...props } />
		</WPInspectorControls>
	);
}
