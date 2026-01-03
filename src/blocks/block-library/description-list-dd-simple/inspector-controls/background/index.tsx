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
import { BackgroundColor } from './background-color';

// @ts-ignore.
export function Background( props ) {
	return (
		<Panel title={ __( '背景', 'ystandard-toolbox' ) }>
			<BackgroundColor { ...props } />
		</Panel>
	);
}
