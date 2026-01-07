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
import { LabelType } from '@aktk/blocks/block-library/timeline/inspector-controls/bulk-label/label-type';
import { LabelWeight } from '@aktk/blocks/block-library/timeline/inspector-controls/bulk-label/label-weight';
import { FontSize } from '@aktk/blocks/block-library/timeline/inspector-controls/bulk-label/font-size';
import { LabelColor } from '@aktk/blocks/block-library/timeline/inspector-controls/bulk-label/label-color';
import { BackgroundColor } from '@aktk/blocks/block-library/timeline/inspector-controls/bulk-label/background-color';

export function BulkLabel( props: TimeLineInspectorProps ): JSX.Element {
	return (
		<Panel title={ __( 'ラベル一括設定', 'ystandard-toolbox' ) }>
			<BorderRadius { ...props } />
			<LabelType { ...props } />
			<LabelWeight { ...props } />
			<FontSize { ...props } />
			<LabelColor { ...props } />
			<BackgroundColor { ...props } />
		</Panel>
	);
}
