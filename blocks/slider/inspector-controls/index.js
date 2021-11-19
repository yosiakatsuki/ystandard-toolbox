import { InspectorControls } from '@wordpress/block-editor';
import PanelBasic from "./basic";
import PanelAdvanced from "./advanced";
import PanelAutoplay from "./autoplay";

export const SliderInspectorControls = ( props ) => {
	return (
		<InspectorControls>
			<PanelBasic { ...props } />
			<PanelAdvanced { ...props } />
			<PanelAutoplay { ...props } />
		</InspectorControls>
	);
};
