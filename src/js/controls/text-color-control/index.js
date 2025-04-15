import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import ColorPaletteControl from '@ystd/components/color-palette-control';
import { hasObjectKey } from '@ystd/helper/object';

const TextColorControl = ( { id, value, onChange, label, ...props } ) => {
	const _color = hasObjectKey( value, 'color' ) ? value.color : value;
	const _id = id ?? 'text-color';
	const handleOnChange = ( newValue ) => {
		onChange( newValue );
	};

	return (
		<BaseControl __nextHasNoMarginBottom>
			<ColorPaletteControl
				value={ _color }
				onChange={ handleOnChange }
				label={ label ?? __( '文字色', 'ystandard-toolbox' ) }
				key={ _id }
				{ ...props }
			/>
		</BaseControl>
	);
};
export default TextColorControl;
