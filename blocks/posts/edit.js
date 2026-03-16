import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	Disabled,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

import _toNumber from '../../src/js/blocks/function/_toNumber';
import * as BlockOption from './inspector-controls';
import PanelThumbnail from './inspector-controls/thumbnail';
import PanelSearchOption from './inspector-controls/search-option';
import PanelAdvancedSearch from './inspector-controls/advanced-search';
import PanelAdvancedDesign from './inspector-controls/advanced-design';
import PanelBasicOption from './inspector-controls/basic-option';

const Posts = ( props ) => {
	const { attributes, setAttributes } = props;
	const {
		colMobile,
		colTablet,
		colPc,
		showDate,
		showCategory,
		showExcerpt,
		listType,
	} = attributes;
	return (
		<div className={ 'ystdtb-posts' }>
			<>
				<InspectorControls>
					<PanelBasicOption { ...props } />
					<PanelSearchOption { ...props } />
					<PanelAdvancedSearch { ...props } />
					<PanelAdvancedDesign { ...props } />
				</InspectorControls>
			</>
			<Disabled>
				<ServerSideRender
					block="ystdtb/posts"
					attributes={ attributes }
				/>
			</Disabled>
		</div>
	);
};

export default Posts;
