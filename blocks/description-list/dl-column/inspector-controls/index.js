import { InspectorControls } from '@wordpress/block-editor';
import PanelStyle from "./style";

export const DescriptionListColumnInspectorControls = ( props ) => {
	return (
		<InspectorControls>
			<PanelStyle { ...props } />
		</InspectorControls>
	);
};
