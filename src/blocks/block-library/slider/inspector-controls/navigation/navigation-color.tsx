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
import type { SliderEditProps } from '../../types';

export function NavigationColor( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { navigationColor, customNavigationColor } = attributes;

	const handleOnChange = ( newColor?: string, slug?: string ) => {
		setAttributes( {
			navigationColor: slug,
			customNavigationColor: slug ? undefined : newColor,
		} );
	};

	return (
		<BaseControl
			id="slider-navigationColor"
			label={ __( 'ナビゲーション色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( 'ナビゲーション色', 'ystandard-toolbox' ) }
				value={ customNavigationColor || '' }
				slug={ navigationColor }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
