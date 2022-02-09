import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import BackgroundColor from "./background-color";

const PanelBackgroundColor = ( props ) => {
	return (
		<PanelBody
			title={ __( '余白', 'ystandard-toolbox' ) }
			initialOpen={ true }
		>
			<BackgroundColor { ...props }/>
		</PanelBody>
	);
};
export default PanelBackgroundColor;
