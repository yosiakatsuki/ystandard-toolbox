import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ColorGradientControl from '@ystdtb/components/color-gradient-control';

const BackgroundColorControl = ( { color, onChange, label, ...props } ) => {
	const _color = color?.color ?? color;
	return (
		<BaseControl>
			<ColorGradientControl
				{ ...props }
				label={ label ? label : __( '背景色', 'ystandard-toolbox' ) }
				colorValue={ _color }
				onColorChange={ onChange }
			/>
		</BaseControl>
	);
};
export default BackgroundColorControl;
