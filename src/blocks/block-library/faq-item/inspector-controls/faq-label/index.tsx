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
import { LabelBackgroundColor } from './label-background-color';
import { LabelBorderRadius } from './label-border-radius';
import { LabelBorder } from './label-border';

// @ts-ignore.
export function FAQLabel( props ): JSX.Element {
	return (
		<Panel title={ __( 'FAQラベル設定', 'ystandard-toolbox' ) }>
			<LabelBackgroundColor { ...props } />
			<LabelBorderRadius { ...props } />
			<LabelBorder { ...props } />
		</Panel>
	);
}
