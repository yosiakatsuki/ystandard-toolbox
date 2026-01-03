/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ColorGradientPalette } from '@aktk/block-components/components/color-pallet-control';
/**
 * Block Dependencies.
 */
import type { DdSimpleBlockProps } from '../../types';

export function BackgroundColor( props: DdSimpleBlockProps ): JSX.Element {
	const { attributes, setAttributes, gradientValue, setGradient } = props;
	const { backgroundColor, customBackgroundColor } = attributes;

	const handleOnChange = ( newColor?: string, slug?: string ) => {
		setAttributes( {
			backgroundColor: slug,
			customBackgroundColor: slug ? undefined : newColor,
		} );
	};

	const handleGradientChange = ( newGradient: string ) => {
		if ( setGradient ) {
			setGradient( newGradient );
		}
	};

	return (
		<BaseControl
			id="dt-background-color"
			label={ __( '背景色', 'ystandard-toolbox' ) }
		>
			<ColorGradientPalette
				label={ __( '背景色', 'ystandard-toolbox' ) }
				colorValue={ customBackgroundColor || '' }
				colorSlug={ backgroundColor }
				onColorChange={ handleOnChange }
				gradientValue={ gradientValue }
				onGradientChange={ handleGradientChange }
			/>
		</BaseControl>
	);
}
