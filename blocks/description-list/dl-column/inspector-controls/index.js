import { InspectorControls } from '@wordpress/block-editor';
import PanelStyle from './style';
import PanelMargin from './margin';
import PanelSize from './size';
import PanelBorder from './border';

export const DescriptionListColumnInspectorControls = ( props ) => {
	return (
		<InspectorControls>
			<PanelStyle { ...props } />
			<PanelSize { ...props } />
			<PanelBorder { ...props } />
			<PanelMargin { ...props } />
		</InspectorControls>
	);
};
