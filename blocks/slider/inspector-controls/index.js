import { InspectorControls } from '@wordpress/block-editor';
import PanelBasic from "./basic";
import PanelAdvanced from "./advanced";
import PanelAutoplay from "./autoplay";
import PanelSize from "./size";
import PanelSlide from "./slide";
import PanelNavigation from "./navigation";

export const SliderInspectorControls = ( props ) => {
	return (
		<InspectorControls>
			<PanelBasic { ...props } />
			<PanelAutoplay { ...props } />
			<PanelSize { ...props } />
			<PanelSlide { ...props } />
			<PanelNavigation { ...props } />


			<PanelAdvanced { ...props } />
		</InspectorControls>
	);
};
