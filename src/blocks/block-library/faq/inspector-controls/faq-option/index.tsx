/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { Panel } from '@aktk/block-components/components/panel';
import { Accordion } from './accordion';

export function FaqOption( props ): JSX.Element {
	return (
		<Panel title={ __( 'FAQ設定', 'ystandard-toolbox' ) }>
			<Accordion { ...props } />
		</Panel>
	);
}
