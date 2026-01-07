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
import type { TimeLineInspectorProps } from '../../types';
import { ContentsSpacing } from './contents-spacing';
import { BorderColor } from './border-color';
import { Margin } from './margin';

export function BulkContents( props: TimeLineInspectorProps ): JSX.Element {
	return (
		<Panel title={ __( 'コンテンツ一括設定', 'ystandard-toolbox' ) }>
			<ContentsSpacing { ...props } />
			<BorderColor { ...props } />
			<Margin { ...props } />
		</Panel>
	);
}
