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

// @ts-ignore.
export function FaqOption( props ): JSX.Element {
	return (
		<Panel title={ __( 'FAQ設定', 'ystandard-toolbox' ) }>
			<Accordion { ...props } />
			<AccordionArrowColor { ...props } />
			<BackgroundColor { ...props } />
		</Panel>
	);
}
