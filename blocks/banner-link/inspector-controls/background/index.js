import { __ } from '@wordpress/i18n';
import PanelColorGradientSettings from "@ystdtb/components/panel-color-gradient-settings";
import Opacity from "./opacity";

const PanelBackground = ( props ) => {
	const {
		backgroundColor,
		setBackgroundColor
	} = props;
	return (
		<PanelColorGradientSettings
			title={ __( '背景色設定', 'ystandard-toolbox' ) }
			initialOpen={ false }
			value={ backgroundColor.color }
			onChange={ setBackgroundColor }
			label={ __( '背景色', 'ystandard-toolbox' ) }
		>
			<Opacity { ...props } />
		</PanelColorGradientSettings>
	);
};
export default PanelBackground;
