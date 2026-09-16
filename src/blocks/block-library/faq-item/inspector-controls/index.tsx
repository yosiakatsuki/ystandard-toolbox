/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies
 */
import { Design } from './design';
import { FAQLabel } from './faq-label';
import { LabelTypography } from './styles/label-typography';

// @ts-ignore.
export function InspectorControls( props ): JSX.Element {
	return (
		<>
			<WPInspectorControls>
				<Design { ...props } />
				<FAQLabel { ...props } />
			</WPInspectorControls>
			<WPInspectorControls group="styles">
				<LabelTypography { ...props } />
			</WPInspectorControls>
		</>
	);
}
