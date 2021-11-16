import {
	__experimentalUseGradient,
	__experimentalColorGradientControl as WPColorGradientControl,
} from '@wordpress/block-editor';
import { select } from '@wordpress/data';

const ColorGradientControl = ( {
								   colors,
								   onColorChange,
								   onGradientChange,
								   colorValue,
								   ...props
							   } ) => {

	const { gradientValue, setGradient } = __experimentalUseGradient();
	const getColorSetting = () => {
		const { colors } = select( 'core/block-editor' ).getSettings();
		return colors;
	};
	const _colors = colors ?? getColorSetting();
	const _gradientValue = props?.gradientValue ?? gradientValue;
	const _onGradientChange = onGradientChange ?? setGradient;
	return (
		<div className="ystdtb-component-color-gradient-control">
			<WPColorGradientControl
				onColorChange={ onColorChange }
				onGradientChange={ _onGradientChange }
				colorValue={ colorValue }
				gradientValue={ _gradientValue }
				colors={ _colors }
				{ ...props }
			/>
		</div>
	);
}

export default ColorGradientControl;
