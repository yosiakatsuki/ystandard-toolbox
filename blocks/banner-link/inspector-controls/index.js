import {
	InspectorControls,
} from '@wordpress/block-editor';
import PanelPadding from "./padding/index";
import PanelMainText from "./main-text";

export const BannerLinkInspectorControls = ( props ) => {

	return (
		<InspectorControls>
			<PanelMainText { ...props } />
			<PanelPadding { ...props } />
		</InspectorControls>
	);
}
