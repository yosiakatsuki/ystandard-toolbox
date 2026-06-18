/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ColorGradientPalette } from '@aktk/block-components/components/color-pallet-control';

const BackgroundColor = ( props ) => {
	const { attributes, setAttributes, gradientValue, setGradient } = props;
	const { backgroundColor, customBackgroundColor } = attributes;

	const handleColorChange = ( newColor?: string, slug?: string ) => {
		if ( setGradient ) {
			setGradient( undefined );
		}
		setAttributes( {
			backgroundColor: slug,
			customBackgroundColor: slug ? undefined : newColor,
		} );
	};

	const handleGradientChange = ( newGradient?: string ) => {
		setAttributes( {
			backgroundColor: undefined,
			customBackgroundColor: undefined,
		} );
		if ( setGradient ) {
			setGradient( newGradient );
		}
	};

	return (
		<BaseControl
			id="banner-background-color"
			label={ __( '背景色', 'ystandard-toolbox' ) }
		>
			<ColorGradientPalette
				label={ __( '背景色', 'ystandard-toolbox' ) }
				colorValue={ customBackgroundColor || '' }
				colorSlug={ backgroundColor }
				onColorChange={ handleColorChange }
				gradientValue={ gradientValue }
				onGradientChange={ handleGradientChange }
				enableCurrentColor={ true }
				enableTransparent={ true }
			/>
		</BaseControl>
	);
};
export default BackgroundColor;
