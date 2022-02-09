import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import ColorPaletteControl from '@ystdtb/components/color-palette-control';

const TextColor = ( { textColor, setTextColor } ) => {
	return (
		<BaseControl
			id={ textColor }
			label={ __( '色', 'ystandard-toolbox' ) }
		>
			<ColorPaletteControl
				value={ textColor.color }
				onChange={ setTextColor }
			/>
		</BaseControl>
	);
};
export default TextColor;
