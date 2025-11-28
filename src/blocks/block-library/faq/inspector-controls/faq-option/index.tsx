/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { Panel } from '@aktk/block-components/components/panel';
import { Accordion } from './accordion';
import { AccordionArrowColor } from './accordion-arrow-color';
import { BackgroundColor } from './background-color';
import { BorderType } from '@aktk/blocks/block-library/faq/inspector-controls/faq-option/border-type';

// @ts-ignore.
export function FaqOption( props ): JSX.Element {
	return (
		<Panel title={ __( 'FAQ設定', 'ystandard-toolbox' ) }>
			<Accordion { ...props } />
			<AccordionArrowColor { ...props } />
			<BackgroundColor { ...props } />
			<BorderType { ...props } />
		</Panel>
	);
}
