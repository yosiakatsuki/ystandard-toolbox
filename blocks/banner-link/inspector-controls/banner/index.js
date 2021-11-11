import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Image from "./image";
import FocalPoint from "./focal-point";
import RatioSize from "./ratio-size";
import MaxWidth from "./max-width";
import MinHeight from "./min-height";
import BorderRadius from "./border-radius";

const PanelBanner = ( props ) => {
	return (
		<PanelBody
			title={ __( 'バナー設定', 'ystandard-toolbox' ) }
		>
			<Image { ...props } />
			<FocalPoint { ...props } />
			<RatioSize { ...props } />
			<MaxWidth { ...props } />
			<MinHeight { ...props } />
			<BorderRadius { ...props } />
		</PanelBody>
	);
}
export default PanelBanner;
