import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import SliderId from "./slider-id";

const Advanced = ( props ) => {

	return (
		<PanelBody title={ __( '上級者向け設定', 'ystandard-toolbox' ) }>
			<SliderId { ...props } />
		</PanelBody>
	);
}
export default Advanced;
