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
import { DtWidth } from './dt-width';

export function Size( props: DlColumnBlockProps ) {
	return (
		<Panel title={ __( 'サイズ', 'ystandard-toolbox' ) }>
			<DtWidth { ...props } />
		</Panel>
	);
}
