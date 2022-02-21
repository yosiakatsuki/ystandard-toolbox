import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import ColorPaletteControl from '@ystdtb/components/color-palette-control';

const TextColorControl = ( { id, value, onChange, label, ...props } ) => {
	const _color = value?.color ?? value;
	const _id = id ?? 'text-color';
	return (
		<BaseControl
			id={ _id }
			label={ label ? label : __( '色', 'ystandard-toolbox' ) }
		>
			<ColorPaletteControl
				value={ _color }
				onChange={ onChange }
				{ ...props }
			/>
		</BaseControl>
	);
};
export default TextColorControl;
