import { InspectorControls } from '@wordpress/block-editor';
import PanelPadding from "./padding";
import PanelBackgroundColor from "./backgroundColor";
import PanelText from "./text";

export const DescriptionListDdBoxInspectorControls = ( props ) => {
	return (
		<InspectorControls>
			<PanelBackgroundColor { ...props } />
			<PanelText { ...props } />
			<PanelPadding { ...props } />
		</InspectorControls>
	);
};
