import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import BannerLinkLinkControl from "../../controls/link";
import Rel from "./rel";

const PanelLink = ( props ) => {
	return (
		<PanelBody
			title={ __( 'リンク', 'ystandard-toolbox' ) }
		>
			<div className="ystdtb-banner-link-inspector-controls__link">
				<BannerLinkLinkControl { ...props }/>
				<Rel { ...props }/>
			</div>
		</PanelBody>
	);
}
export default PanelLink;
