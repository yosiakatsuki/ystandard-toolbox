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
import { ContentsSpacing } from '@aktk/blocks/block-library/timeline/inspector-controls/bulk-settings/contents-spacing';

export function BulkSettings( props: TimeLineInspectorProps ): JSX.Element {
	return (
		<Panel title={ __( 'タイムライン一括設定', 'ystandard-toolbox' ) }>
			<ContentsSpacing { ...props } />
		</Panel>
	);
}
