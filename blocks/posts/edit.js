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
					<PanelBody
						initialOpen={ false }
						title={ __(
							'日付・カテゴリー・概要の表示',
							'ystandard-toolbox'
						) }
					>
						<ToggleControl
							label={ __(
								'日付を表示する',
								'ystandard-toolbox'
							) }
							onChange={ () => {
								setAttributes( {
									showDate: ! showDate,
								} );
							} }
							checked={ showDate }
							__nextHasNoMarginBottom
						/>
						<ToggleControl
							label={ __(
								'カテゴリーを表示する',
								'ystandard-toolbox'
							) }
							onChange={ () => {
								setAttributes( {
									showCategory: ! showCategory,
								} );
							} }
							checked={ showCategory }
							__nextHasNoMarginBottom
						/>
						{ 'simple' !== listType && (
							<>
								<ToggleControl
									label={ __(
										'概要を表示する',
										'ystandard-toolbox'
									) }
									onChange={ () => {
										setAttributes( {
											showExcerpt: ! showExcerpt,
										} );
									} }
									checked={ showExcerpt }
									__nextHasNoMarginBottom
								/>
								<BlockOption.ExcerptLength { ...props } />
							</>
						) }
					</PanelBody>
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
