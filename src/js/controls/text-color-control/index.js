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
		<BaseControl
			id={ _id }
			label={ label ? label : __( '色', 'ystandard-toolbox' ) }
		>
			<ColorPaletteControl
				value={ _color }
				onChange={ handleOnChange }
				{ ...props }
			/>
		</BaseControl>
	);
};
export default TextColorControl;
