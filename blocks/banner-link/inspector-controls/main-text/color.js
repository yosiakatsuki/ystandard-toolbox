import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import ColorPaletteControl from '@ystd/components/color-palette-control';

const Color = ( { mainTextColor, setMainTextColor } ) => {
	return (
		<BaseControl
			id={ mainTextColor }
			label={ __( '色', 'ystandard-toolbox' ) }
		>
			<ColorPaletteControl
				value={ mainTextColor.color }
				onChange={ setMainTextColor }
			/>
		</BaseControl>
	);
};
export default Color;
