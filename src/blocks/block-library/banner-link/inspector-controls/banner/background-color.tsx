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
		setAttributes( {
			backgroundColor: slug,
			customBackgroundColor: slug ? undefined : newColor,
		} );
	};

	const handleGradientChange = ( newGradient?: string ) => {
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
				enableCurrentColor={ false }
				enableTransparent={ false }
			/>
		</BaseControl>
	);
};
export default BackgroundColor;
