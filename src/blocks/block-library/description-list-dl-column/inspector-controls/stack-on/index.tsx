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
import { StackOnToggle } from './stack-on-toggle';

// @ts-ignore.
export function StackOn( props ) {
	return (
		<Panel title={ __( '横並び設定', 'ystandard-toolbox' ) }>
			<StackOnToggle { ...props } />
		</Panel>
	);
}
