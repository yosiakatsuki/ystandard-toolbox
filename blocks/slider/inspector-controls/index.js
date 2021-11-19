import { InspectorControls } from '@wordpress/block-editor';
import PanelBasic from "./basic";
import PanelAdvanced from "./advanced";
import PanelAutoplay from "./autoplay";
import PanelSize from "./size";

export const SliderInspectorControls = ( props ) => {
	return (
		<InspectorControls>
			<PanelBasic { ...props } />
			<PanelAutoplay { ...props } />
			<PanelSize { ...props } />


			<PanelAdvanced { ...props } />
		</InspectorControls>
	);
};
