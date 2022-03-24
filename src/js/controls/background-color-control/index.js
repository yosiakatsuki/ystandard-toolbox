import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ColorGradientControl from '@ystdtb/components/color-gradient-control';
import { hasObjectKey } from "@ystdtb/helper/object";

const BackgroundColorControl = ( { value, onChange, label, ...props } ) => {
	const _color = hasObjectKey( value, 'color' ) ? value.color : value;
	return (
		<BaseControl>
			<ColorGradientControl
				label={ label ? label : __( '背景色', 'ystandard-toolbox' ) }
				colorValue={ _color }
				onColorChange={ onChange }
				{ ...props }
			/>
		</BaseControl>
	);
};
export default BackgroundColorControl;
