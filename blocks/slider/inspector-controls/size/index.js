import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import RatioSize from "./ratio-size";
import Height from "./height";

const PanelSize = ( props ) => {

	return (
		<PanelBody title={ __( 'サイズ設定', 'ystandard-toolbox' ) }>
			<RatioSize { ...props } />
			<Height { ...props } />
		</PanelBody>
	);
}
export default PanelSize;
