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
import { BorderRadius } from '@aktk/blocks/block-library/timeline/inspector-controls/bulk-label/border-radius';

export function BulkLabel( props: TimeLineInspectorProps ): JSX.Element {
	return (
		<Panel title={ __( 'ラベル一括設定', 'ystandard-toolbox' ) }>
			<BorderRadius { ...props } />
		</Panel>
	);
}
