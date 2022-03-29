import { InspectorControls } from '@wordpress/block-editor';
import PanelStyle from './style';
import PanelMargin from './margin';

export const DescriptionListColumnInspectorControls = ( props ) => {
	return (
		<InspectorControls>
			<PanelStyle { ...props } />
			<PanelMargin { ...props } />
		</InspectorControls>
	);
};
