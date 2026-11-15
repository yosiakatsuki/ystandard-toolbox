/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import { FaqOption } from './faq-option';
import { AccordionArrowColor } from './styles/accordion-arrow-color';
import { AccordionArrowSpacing } from './styles/accordion-arrow-spacing';
import { ResponsiveSpacing } from './styles/responsive-spacing';
import { ResponsiveTypography } from './styles/responsive-typography';

// @ts-ignore.
export function InspectorControls( props ): JSX.Element {
	return (
		<>
			<WPInspectorControls>
				<FaqOption { ...props } />
			</WPInspectorControls>
			<WPInspectorControls group="styles">
				<AccordionArrowColor { ...props } />
				<AccordionArrowSpacing { ...props } />
				<ResponsiveSpacing { ...props } />
				<ResponsiveTypography { ...props } />
			</WPInspectorControls>
		</>
	);
}
