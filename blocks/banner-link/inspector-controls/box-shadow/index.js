import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import BoxShadow from "./box-shadow";

const PanelBoxShadow = ( props ) => {
	return (
		<PanelBody
			title={ __( '影', 'ystandard-toolbox' ) }
		>
			<BoxShadow { ...props } />
		</PanelBody>
	);
}
export default PanelBoxShadow;
