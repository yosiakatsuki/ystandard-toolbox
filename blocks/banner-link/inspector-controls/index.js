import {
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import Padding from "./padding";


export const BannerLinkInspectorControls = ( props ) => {

	return (
		<InspectorControls>
			<PanelBody
				title={ __( '余白', 'ystandard-toolbox' ) }
			>
				<Padding { ...props } />
			</PanelBody>
		</InspectorControls>
	);
}
