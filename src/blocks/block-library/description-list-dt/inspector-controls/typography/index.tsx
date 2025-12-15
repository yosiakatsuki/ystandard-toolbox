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
import { FontSize } from './font-size';
import { Color } from './color';
import { FontWeight } from './font-weight';

// @ts-ignore.
export function Typography( props ): JSX.Element {
	return (
		<Panel title={ __( 'テキスト', 'ystandard-toolbox' ) }>
			<FontSize { ...props } />
			<Color { ...props } />
			<FontWeight { ...props } />
		</Panel>
	);
}
