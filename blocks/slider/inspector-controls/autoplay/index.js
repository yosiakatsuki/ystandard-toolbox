import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Autoplay from "./autoplay";
import AutoplayDelay from "./autoplay-delay";
import PauseOnMouse from "./pause-on-mouse";
import DisableOnInteraction from "./disable-on-interaction";

const PanelAutoplay = ( props ) => {

	return (
		<PanelBody title={ __( '自動再生(オートプレイ)', 'ystandard-toolbox' ) }>
			<Autoplay { ...props } />
			<AutoplayDelay { ...props } />
			<PauseOnMouse { ...props } />
			<DisableOnInteraction { ...props } />
		</PanelBody>
	);
}
export default PanelAutoplay;
