import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import Rel from "./rel";
import Link from "./link";

const PanelLink = ( props ) => {
	return (
		<PanelBody
			title={ __( 'リンク', 'ystandard-toolbox' ) }
		>
			<div className="ystdtb-banner-link-inspector-controls__link">
				<Link { ...props }/>
				<Rel { ...props }/>
			</div>
		</PanelBody>
	);
}
export default PanelLink;
