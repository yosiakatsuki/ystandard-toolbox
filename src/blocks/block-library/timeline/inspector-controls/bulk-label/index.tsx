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
import { BorderRadius } from './border-radius';
import { LabelType } from './label-type';
import { LabelWeight } from './label-weight';
import { FontSize } from './font-size';
import { LabelColor } from './label-color';
import { BackgroundColor } from './background-color';
import { LabelBorderWidth } from './label-border-width';
import { LabelBorderColor } from './label-border-color';

export function BulkLabel( props: TimeLineInspectorProps ): JSX.Element {
	return (
		<Panel title={ __( 'ラベル一括設定', 'ystandard-toolbox' ) }>
			<BorderRadius { ...props } />
			<LabelType { ...props } />
			<LabelWeight { ...props } />
			<FontSize { ...props } />
			<LabelColor { ...props } />
			<BackgroundColor { ...props } />
			<LabelBorderWidth { ...props } />
			<LabelBorderColor { ...props } />
		</Panel>
	);
}
