import { InspectorControls } from '@wordpress/block-editor';
import PanelMargin from "./margin";

export const DescriptionListInspectorControls = ( props ) => {
	return (
		<InspectorControls>
			<PanelMargin { ...props } />
		</InspectorControls>
	);
};
