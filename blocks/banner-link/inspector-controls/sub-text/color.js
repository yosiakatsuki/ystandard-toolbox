import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import ColorPaletteControl from "@ystdtb/components/color-palette-control";

const Color = ( { subTextColor, setSubTextColor } ) => {

	return (
		<BaseControl
			id={ subTextColor }
			label={ __( '色', 'ystandard-toolbox' ) }
		>
			<ColorPaletteControl
				value={ subTextColor.color }
				onChange={ setSubTextColor }
			/>
		</BaseControl>
	);

}
export default Color;
