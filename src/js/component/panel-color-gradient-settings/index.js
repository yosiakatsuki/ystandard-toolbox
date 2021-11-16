import {
	__experimentalUseGradient,
	__experimentalPanelColorGradientSettings as WPPanelColorGradientSettings,
} from '@wordpress/block-editor';

const PanelColorGradientSettings = ( {
	title,
	initialOpen,
	value,
	onChange,
	label,
	gradientColorValue = undefined,
	onGradientChange = undefined,
	settings = undefined,
	children,
	...props
} ) => {
	const { gradientValue, setGradient } = __experimentalUseGradient();
	const _settings = [
		{
			colorValue: value,
			gradientValue: gradientColorValue ?? gradientValue,
			onColorChange: onChange,
			onGradientChange: onGradientChange ?? setGradient,
			label,
			...settings,
		},
	];
	return (
		<WPPanelColorGradientSettings
			title={ title }
			initialOpen={ initialOpen }
			settings={ _settings }
			{ ...props }
		>
			{ children }
		</WPPanelColorGradientSettings>
	);
};
export default PanelColorGradientSettings;
