import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Autoplay from "./autoplay";
import AutoplayDelay from "./autoplay-delay";

const PanelAutoplay = ( props ) => {

	return (
		<PanelBody title={ __( '自動再生(オートプレイ)', 'ystandard-toolbox' ) }>
			<Autoplay {...props} />
			<AutoplayDelay {...props} />
		</PanelBody>
	);
}
export default PanelAutoplay;
