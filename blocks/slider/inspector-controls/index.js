import { InspectorControls } from '@wordpress/block-editor';
import Advanced from "./advanced";

export const SliderInspectorControls = ( props ) => {
	return (
		<InspectorControls>
			<Advanced { ...props } />
		</InspectorControls>
	);
};
