import { InspectorControls } from '@wordpress/block-editor';
import PanelPadding from "./padding/index";
import PanelMainText from "./main-text";
import PanelBoxShadow from "./box-shadow";
import PanelLink from "./link";
import PanelBanner from "./banner";
import PanelBorder from "./border";
import PanelSubText from "./sub-text";

export const BannerLinkInspectorControls = ( props ) => {

	return (
		<InspectorControls>
			<PanelLink { ...props } />
			<PanelBanner { ...props } />
			<PanelBorder  { ...props } />
			<PanelMainText { ...props } />
			<PanelSubText  { ...props } />
			<PanelPadding { ...props } />
			<PanelBoxShadow { ...props } />
		</InspectorControls>
	);
}
