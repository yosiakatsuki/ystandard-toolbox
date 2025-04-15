import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	Disabled,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

import _toNumber from '@aktk/function/_toNumber';
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
					<PanelBody title={ __( '表示設定', 'ystandard-toolbox' ) }>
						<BlockOption.ListDesign { ...props } />
						<div className="ystdtb-block-label">
							{ __( '表示列数', 'ystandard-toolbox' ) }
						</div>
						<RangeControl
							label={ __( 'デスクトップ', 'ystandard-toolbox' ) }
							beforeIcon={ 'desktop' }
							value={ colPc }
							onChange={ ( value ) => {
								setAttributes( {
									colPc: _toNumber( value, 1, 6, 3 ),
								} );
							} }
							min={ 1 }
							max={ 6 }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<RangeControl
							label={ __( 'タブレット', 'ystandard-toolbox' ) }
							beforeIcon={ 'tablet' }
							value={ colTablet }
							onChange={ ( value ) => {
								setAttributes( {
									colTablet: _toNumber( value, 1, 6, 3 ),
								} );
							} }
							min={ 1 }
							max={ 6 }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
						<RangeControl
							label={ __( 'モバイル', 'ystandard-toolbox' ) }
							beforeIcon={ 'smartphone' }
							value={ colMobile }
							onChange={ ( value ) => {
								setAttributes( {
									colMobile: _toNumber( value, 1, 6, 1 ),
								} );
							} }
							min={ 1 }
							max={ 6 }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					</PanelBody>
					<PanelThumbnail { ...props } />
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
