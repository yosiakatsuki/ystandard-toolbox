import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import RatioSize from "./ratio-size";

const PanelSize = ( props ) => {

	return (
		<PanelBody title={ __( 'サイズ設定', 'ystandard-toolbox' ) }>
			<RatioSize {...props} />
		</PanelBody>
	);
}
export default PanelSize;
