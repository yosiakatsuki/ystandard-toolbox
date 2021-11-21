import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ColorPaletteControl from "@ystdtb/components/color-palette-control";

const Color = ( { navigationColor, setNavigationColor } ) => {

	return (
		<BaseControl
			id={ 'navigationColor' }
			label={ __( '矢印色', 'ystandard-toolbox' ) }
		>
			<ColorPaletteControl
				value={ navigationColor.color }
				onChange={ setNavigationColor }
			/>
		</BaseControl>
	);
}
export default Color;
