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

export function BorderColor( props: TimeLineItemProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { contentsBorderColor, customContentsBorderColor } = attributes;
	const handleOnChange = ( newColor?: string, slug?: string ) => {
		const _contentsBorderColor = slug;
		const _customContentsBorderColor = slug ? undefined : newColor;

		setAttributes( {
			contentsBorderColor: _contentsBorderColor,
			customContentsBorderColor: _customContentsBorderColor,
		} );
	};

	return (
		<BaseControl
			id="border-color"
			label={ __( '線の色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( '線の色', 'ystandard-toolbox' ) }
				value={ customContentsBorderColor || '' }
				slug={ contentsBorderColor }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
