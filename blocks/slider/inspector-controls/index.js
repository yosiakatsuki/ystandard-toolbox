import { InspectorControls } from '@wordpress/block-editor';
import Basic from "./basic";
import Advanced from "./advanced";

export const SliderInspectorControls = ( props ) => {
	return (
		<InspectorControls>
			<Basic { ...props } />
			<Advanced { ...props } />
		</InspectorControls>
	);
};
