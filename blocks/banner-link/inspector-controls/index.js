import { InspectorControls } from '@wordpress/block-editor';
import PanelPadding from "./padding/index";
import PanelMainText from "./main-text";
import PanelBoxShadow from "./box-shadow";
import PanelLink from "./link";
import PanelBanner from "./banner";
import PanelBackground from "./background";
import PanelBorder from "./border";

export const BannerLinkInspectorControls = ( props ) => {

	return (
		<InspectorControls>
			<PanelLink { ...props } />
			<PanelBanner { ...props } />
			<PanelBackground  { ...props } />
			<PanelBorder  { ...props } />
			<PanelMainText { ...props } />
			<PanelPadding { ...props } />
			<PanelBoxShadow { ...props } />
		</InspectorControls>
	);
}
