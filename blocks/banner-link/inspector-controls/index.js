import {
	InspectorControls,
} from '@wordpress/block-editor';
import PanelPadding from "./padding/index";
import PanelMainText from "./main-text";
import PanelBoxShadow from "./box-shadow";

export const BannerLinkInspectorControls = ( props ) => {

	return (
		<InspectorControls>
			<PanelMainText { ...props } />
			<PanelPadding { ...props } />
			<PanelBoxShadow { ...props } />
		</InspectorControls>
	);
}
