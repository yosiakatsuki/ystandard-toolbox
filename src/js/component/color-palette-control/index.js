import { ColorPalette } from '@wordpress/components';
import { getColorSetting } from '@ystd/helper/color';
import ColorDropdown from '@ystd/components/color-dropdown';

const ColorPaletteControl = ( {
	value,
	onChange,
	colors,
	label,
	key,
	...props
} ) => {
	const _colors = colors ?? getColorSetting();

	const handleOnChange = ( color ) => {
		onChange( color );
	};

	return (
		<>
			<ColorDropdown
				key={ key }
				label={ label }
				value={ value }
				renderContent={ () => (
					<ColorPalette
						colors={ _colors }
						onChange={ handleOnChange }
						value={ value }
						{ ...props }
					/>
				) }
			/>
		</>
	);
};
export default ColorPaletteControl;
