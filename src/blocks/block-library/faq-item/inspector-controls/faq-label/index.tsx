/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { Panel } from '@aktk/block-components/components/panel';

/**
 * Block Dependencies
 */
import { LabelPosition } from './label-position';
import { LabelSize } from './label-size';
import { LabelWeight } from './label-weight';
import { LabelColor } from './label-color';

// @ts-ignore.
export function FAQLabel( props ): JSX.Element {
	return (
		<Panel title={ __( 'FAQラベル設定', 'ystandard-toolbox' ) }>
			<LabelPosition { ...props } />
			<LabelSize { ...props } />
			<LabelWeight { ...props } />
			<LabelColor { ...props } />
		</Panel>
	);
}
