/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';

/**
 * Block dependencies.
 */
import type { TimeLineItemProps } from '../../types';

export function LabelBorderColor( props: TimeLineItemProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { labelBorderColor, customLabelBorderColor } = attributes;

	// 値の更新.
	const handleOnChange = ( newColor?: string, slug?: string ) => {
		const _labelBorderColor = slug;
		const _customLabelBorderColor = slug ? undefined : newColor;

		setAttributes( {
			labelBorderColor: _labelBorderColor,
			customLabelBorderColor: _customLabelBorderColor,
		} );
	};

	return (
		<BaseControl
			id="label-border-color"
			label={ __( 'ラベル枠線の色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( 'ラベル枠線の色', 'ystandard-toolbox' ) }
				value={ customLabelBorderColor || '' }
				slug={ labelBorderColor }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
