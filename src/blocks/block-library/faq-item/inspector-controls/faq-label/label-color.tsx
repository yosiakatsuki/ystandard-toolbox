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
export function LabelColor( props ): JSX.Element {
	const { labelColor, setLabelColor } = props;

	return (
		<BaseControl
			id="faq-item-label-color"
			label={ __( 'ラベル文字色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( 'ラベル文字色', 'ystandard-toolbox' ) }
				value={ labelColor?.color || '' }
				onChange={ setLabelColor }
			/>
		</BaseControl>
	);
}
