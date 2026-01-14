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

export function BackgroundColor( props: TimeLineItemProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { labelBackgroundColor, customLabelBackgroundColor } = attributes;

	// 値の更新.
	const handleOnChange = ( newColor?: string, slug?: string ) => {
		const _labelBackgroundColor = slug;
		const _customLabelBackgroundColor = slug ? undefined : newColor;

		setAttributes( {
			labelBackgroundColor: _labelBackgroundColor,
			customLabelBackgroundColor: _customLabelBackgroundColor,
		} );
	};

	return (
		<BaseControl
			id="background-color"
			label={ __( 'ラベル背景色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( 'ラベル背景色', 'ystandard-toolbox' ) }
				value={ customLabelBackgroundColor || '' }
				slug={ labelBackgroundColor }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
