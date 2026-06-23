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
import { Color } from './color';

// @ts-ignore.
export function Typography( props ): JSX.Element {
	return (
		<Panel title={ __( 'テキスト', 'ystandard-toolbox' ) }>
			<Color { ...props } />
		</Panel>
	);
}
