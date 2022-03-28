import { ColorPalette } from '@wordpress/components';
import { getColorSetting } from '@ystd/helper/color';

const ColorPaletteControl = ( { value, onChange, colors, ...props } ) => {
	const _colors = colors ?? getColorSetting();

	const handleOnChange = ( color ) => {
		onChange( color );
	};

	return (
		<ColorPalette
			colors={ _colors }
			onChange={ handleOnChange }
			value={ value }
			{ ...props }
		/>
	);
};
export default ColorPaletteControl;
