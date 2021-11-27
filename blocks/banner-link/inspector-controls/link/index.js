import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import Rel from './rel';
import Link from './link';
import Reset from './reset';
import Target from './target';

const PanelLink = ( props ) => {
	return (
		<PanelBody title={ __( 'リンク', 'ystandard-toolbox' ) }>
			<div className="ystdtb-banner-link-inspector-controls__link">
				<Link { ...props } />
				<Target { ...props } />
				<Rel { ...props } />
				<Reset { ...props } />
			</div>
		</PanelBody>
	);
};
export default PanelLink;
