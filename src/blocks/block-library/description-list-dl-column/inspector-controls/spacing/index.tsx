/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { Panel } from '@aktk/block-components/components/panel';

/**
 * Block dependencies.
 */
import { Margin } from './margin';

// @ts-ignore.
export function Spacing( props ): JSX.Element {
	return (
		<Panel title={ __( '余白', 'ystandard-toolbox' ) }>
			<Margin { ...props } />
		</Panel>
	);
}
