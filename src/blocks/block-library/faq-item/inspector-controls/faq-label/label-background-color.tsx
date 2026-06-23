/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';

// @ts-ignore.
export function LabelBackgroundColor( props ): JSX.Element {
	const { labelBackgroundColor, setLabelBackgroundColor } = props;

	return (
		<BaseControl
			id="faq-item-label-background-color"
			label={ __( 'ラベル背景色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( 'ラベル背景色', 'ystandard-toolbox' ) }
				value={ labelBackgroundColor?.color || '' }
				onChange={ setLabelBackgroundColor }
			/>
		</BaseControl>
	);
}
