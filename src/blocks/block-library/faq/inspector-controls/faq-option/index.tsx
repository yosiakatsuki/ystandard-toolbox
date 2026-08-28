/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { Panel } from '@aktk/block-components/components/panel';
/**
 * Block dependencies
 */
import { Accordion } from './accordion';
import { AccordionArrowColor } from './accordion-arrow-color';
import { BorderType } from './border-type';
import { BorderSize } from './border-size';
import { BorderColor } from './border-color';

// @ts-ignore.
export function FaqOption( props ): JSX.Element {
	return (
		<Panel title={ __( 'FAQ設定', 'ystandard-toolbox' ) }>
			<Accordion { ...props } />
			<AccordionArrowColor { ...props } />
			<BorderType { ...props } />
			<BorderSize { ...props } />
			<BorderColor { ...props } />
		</Panel>
	);
}
