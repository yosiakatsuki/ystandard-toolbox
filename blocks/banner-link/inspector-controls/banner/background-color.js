import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ColorGradientControl from '@ystdtb/components/color-gradient-control';

const BackgroundColor = ( props ) => {
	const { backgroundColor, setBackgroundColor } = props;
	return (
		<BaseControl>
			<ColorGradientControl
				label={ __( '背景色', 'ystandard-toolbox' ) }
				colorValue={ backgroundColor.color }
				onColorChange={ setBackgroundColor }
			/>
		</BaseControl>
	);
};
export default BackgroundColor;
