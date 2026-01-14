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
import type { TimeLineItemProps } from '../../types';
import { ContentsSpacing } from './contents-spacing';
import { BorderColor } from './border-color';
import { Margin } from './margin';

export function Timeline( props: TimeLineItemProps ): JSX.Element {
	return (
		<Panel title={ __( 'タイムライン', 'ystandard-toolbox' ) }>
			<ContentsSpacing { ...props } />
			<BorderColor { ...props } />
			<Margin { ...props } />
		</Panel>
	);
}
