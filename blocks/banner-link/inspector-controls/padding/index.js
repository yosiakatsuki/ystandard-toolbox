import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Padding from "./padding";

const PanelPadding = ( props ) => {
	return (
		<PanelBody
			title={ __( '余白', 'ystandard-toolbox' ) }
			initialOpen={ false }
		>
			<Padding { ...props } />
		</PanelBody>
	);
}
export default PanelPadding;
