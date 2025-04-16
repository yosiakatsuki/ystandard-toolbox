import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ColorPaletteControl from '@aktk/components/color-palette-control';

const Color = ( { navigationColor, setNavigationColor } ) => {
	return (
		<BaseControl
			id={ 'navigationColor' }
			label={ __( '色', 'ystandard-toolbox' ) }
			__nextHasNoMarginBottom
		>
			<ColorPaletteControl
				value={ navigationColor.color }
				onChange={ setNavigationColor }
			/>
		</BaseControl>
	);
};
export default Color;
