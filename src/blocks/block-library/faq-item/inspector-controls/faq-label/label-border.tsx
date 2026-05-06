/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';
import { normalizeSizeValue } from '@aktk/block-components/utils/size';
import type { FaqItemBlockAttributes } from '../../types';

// @ts-ignore.
export function LabelBorder( props ): JSX.Element {
	const { attributes, setAttributes, labelBorderColor, setLabelBorderColor } =
		props;
	const { labelBorderSize } = attributes as FaqItemBlockAttributes;

	const handleOnChange = ( value: string ) => {
		setAttributes( { labelBorderSize: normalizeSizeValue( value ) } );
	};
	return (
		<>
			<BaseControl
				id="faq-item-label-border-size"
				label={ __( 'ラベル枠線サイズ', 'ystandard-toolbox' ) }
			>
				<UnitControl
					value={ labelBorderSize }
					onChange={ handleOnChange }
					min={0}
				/>
			</BaseControl>
			<BaseControl
				id="faq-item-label-border-color"
				label={ __( 'ラベル枠線色', 'ystandard-toolbox' ) }
			>
				<ColorPalette
					label={ __( 'ラベル枠線色', 'ystandard-toolbox' ) }
					value={ labelBorderColor?.color }
					onChange={ setLabelBorderColor }
				/>
			</BaseControl>
		</>
	);
}
