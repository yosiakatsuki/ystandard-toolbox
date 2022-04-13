import {
	__experimentalUseGradient,
	__experimentalColorGradientControl as WPColorGradientControl,
} from '@wordpress/block-editor';
import { getColorSetting } from '@ystd/helper/color';
import ColorDropdown from '@ystd/components/color-dropdown';

const ColorGradientControl = ( {
	colors,
	onColorChange,
	onGradientChange,
	colorValue,
	key,
	label,
	...props
} ) => {
	const { gradientValue, setGradient } = __experimentalUseGradient();
	const _colors = colors ?? getColorSetting();
	const _gradientValue = props?.gradientValue ?? gradientValue;
	const _onGradientChange = onGradientChange ?? setGradient;
	return (
		<>
			<ColorDropdown
				key={ key }
				label={ label }
				value={ _gradientValue ?? colorValue }
				renderContent={ () => (
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
				) }
			/>
		</>
	);
};

export default ColorGradientControl;
