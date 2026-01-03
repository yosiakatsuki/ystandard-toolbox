/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { Panel } from '@aktk/block-components/components/panel';
/**
 * Block Dependencies.
 */
import type { DlColumnBlockProps } from '../../types';
import { BorderSelect } from './border';

export function Border( props: DlColumnBlockProps ) {
	return (
		<Panel title={ __( '枠線', 'ystandard-toolbox' ) }>
			<BorderSelect { ...props } />
		</Panel>
	);
}
