import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block
 */
import PanelMargin from './margin';
import PanelSize from './size';
import PanelZIndex from './z-index';
import PanelLayout from './layout';

const InspectorControls = ( props ) => {
	return (
		<WPInspectorControls>
			<PanelLayout { ...props } />
			<PanelSize { ...props } />
			<PanelMargin { ...props } />
			<PanelZIndex { ...props } />
		</WPInspectorControls>
	);
};
export default InspectorControls;
