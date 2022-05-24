import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	SelectControl,
	Disabled,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

import { orderbySelect } from './config';
import _toNumber from '../../src/js/blocks/function/_toNumber';
import * as BlockOption from './inspector-controls';
import PanelThumbnail from './inspector-controls/thumbnail';
import PanelSearchOption from './inspector-controls/search-option';
import AdvancedSearch from './inspector-controls/advanced-search';

const Posts = ( props ) => {
	const { attributes, setAttributes } = props;
	const {
		count,
		orderby,
		order,
		colMobile,
		colTablet,
		colPc,
		showDate,
		showCategory,
		showExcerpt,
		listType,
	} = attributes;

	const orderSelected = `${ orderby }/${ order }`;

	// if (
	// 	window.ystdtbBlockEditor.isEnableSga &&
	// 	! orderbySelect.some(
	// 		( orderItem ) => 'ranking/DESC' === orderItem.value
	// 	)
	// ) {
	// 	orderbySelect.push( {
	// 		label: __( 'ランキング(β)', 'ystandard-toolbox' ),
	// 		value: 'ranking/DESC',
	// 	} );
	// }

	return (
		<div className={ 'ystdtb-posts' }>
			<>
				<InspectorControls>
					<PanelBody title={ __( '基本設定', 'ystandard-toolbox' ) }>
						<RangeControl
							label={ __( '表示件数', 'ystandard-toolbox' ) }
							value={ count }
							onChange={ ( value ) => {
								setAttributes( {
									count: _toNumber( value, 1, 20, 3 ),
								} );
							} }
							min={ 1 }
							max={ 20 }
						/>
						<SelectControl
							label={ __( '並び順', 'ystandard-toolbox' ) }
							value={ orderSelected }
							options={ orderbySelect }
							onChange={ ( value ) => {
								const _order = value.split( '/' );
								setAttributes( {
									orderby: _order[ 0 ],
									order: _order[ 1 ],
								} );
							} }
						/>
					</PanelBody>
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
								/>
								<BlockOption.ExcerptLength { ...props } />
							</>
						) }
					</PanelBody>

					<PanelSearchOption { ...props } />
					<AdvancedSearch { ...props } />
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
