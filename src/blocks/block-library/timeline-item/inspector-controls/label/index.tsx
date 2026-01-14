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
import { BorderRadius } from './border-radius';
import { LabelType } from './label-type';
import { LabelIcon } from './label-icon';
import { LabelText } from './label-text';
import { LabelWeight } from './label-weight';
import { FontSize } from './font-size';
import { LabelColor } from './label-color';
import { BackgroundColor } from './background-color';
import { LabelBorderColor } from './label-border-color';
import { LabelBorderWidth } from './label-border-width';

export function Label( props: TimeLineItemProps ): JSX.Element {
	return (
		<Panel title={ __( 'ラベル', 'ystandard-toolbox' ) }>
			<BorderRadius { ...props } />
			<LabelType { ...props } />
			<LabelIcon { ...props } />
			<LabelText { ...props } />
			<LabelWeight { ...props } />
			<FontSize { ...props } />
			<LabelColor { ...props } />
			<BackgroundColor { ...props } />
			<LabelBorderWidth { ...props } />
			<LabelBorderColor { ...props } />
		</Panel>
	);
}
