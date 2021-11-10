import { ColorPalette } from '@wordpress/components';
import { select } from '@wordpress/data';

const ColorPaletteControl = ( { value, onChange, colors, ...props } ) => {

	const getColorSetting = () => {
		const { colors } = select( 'core/block-editor' ).getSettings();
		return colors;
	};
	const _colors = colors ?? getColorSetting();

	const handleOnChange = ( color ) => {
		onChange( color );
	}

	return (
		<ColorPalette
			colors={ _colors }
			onChange={ handleOnChange }
			value={ value }
			{ ...props }
		/>
	);
}
export default ColorPaletteControl;
