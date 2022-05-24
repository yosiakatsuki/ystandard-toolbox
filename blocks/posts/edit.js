import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	BaseControl,
	ToggleControl,
	TextControl,
	RangeControl,
	SelectControl,
	Disabled,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

import { orderbySelect } from './config';
import _toNumber from '../../src/js/blocks/function/_toNumber';
import _getOptionsDefault from '../../src/js/blocks/function/_getOptionsDefault';
import _getTermTree from '../../src/js/blocks/function/_getTermTree';
import _getParentPages from '../../src/js/blocks/function/_getParentPages';
import * as BlockOption from './inspector-controls';
import PanelThumbnail from './inspector-controls/thumbnail';

const Posts = ( props ) => {
	const { attributes, setAttributes } = props;
	const {
		count,
		orderby,
		order,
		colMobile,
		colTablet,
		colPc,
		taxonomy,
		termSlug,
		showDate,
		showCategory,
		showExcerpt,
		postType,
		postIn,
		postNameIn,
		postParent,
		listType,
	} = attributes;

	const { postTypes, taxonomyList, hierarchicalPosts } = useSelect(
		( select ) => {
			const { getPostTypes, getTaxonomy, getEntityRecords } = select(
				'core'
			);
			const getPostTypesResult = getPostTypes( { per_page: -1 } );
			const getTaxonomyResult = getTaxonomy();
			const _postTypes = getPostTypesResult || [];
			const _taxonomy = getTaxonomyResult || [];
			const hierarchicalPostType = _postTypes
				.filter( ( type ) => {
					return type.hierarchical;
				} )
				.map( ( { slug } ) => {
					return slug;
				} );
			let _hierarchicalPosts = [];
			if ( hierarchicalPostType.includes( postType ) ) {
				_hierarchicalPosts = _getParentPages(
					getEntityRecords( 'postType', postType, {
						per_page: -1,
					} ),
					0,
					0
				);
				if ( 0 < _hierarchicalPosts.length ) {
					_hierarchicalPosts = [
						_getOptionsDefault(),
						..._hierarchicalPosts,
					];
				}
			}

			return {
				postTypes: _postTypes.filter( ( type ) => {
					return ! (
						! type.viewable ||
						'ys-parts' === type.slug ||
						'attachment' === type.slug
					);
				} ),
				taxonomyList: _taxonomy,
				hierarchicalPosts: _hierarchicalPosts,
			};
		}
	);

	const postTypesOptions = postTypes.map( ( { name, slug } ) => ( {
		value: slug,
		label: name,
	} ) );

	const selectedPostType = postTypes.filter( ( type ) => {
		return type.slug === postType;
	} );

	const taxonomyOptions = () => {
		const _taxonomy = selectedPostType.length
			? selectedPostType[ 0 ].taxonomies
			: [];
		return [
			_getOptionsDefault(),
			..._taxonomy.map( ( value ) => {
				if ( taxonomyList.hasOwnProperty( value ) ) {
					return {
						value: taxonomyList[ value ].slug,
						label: taxonomyList[ value ].name,
					};
				}
				return {};
			} ),
		];
	};
	const { termOptions } = useSelect( ( select ) => {
		const { getEntityRecords } = select( 'core' );
		let terms = getEntityRecords( 'taxonomy', taxonomy, {
			per_page: -1,
		} );
		if ( ! terms ) {
			terms = [];
		}
		let tree = terms;
		if (
			taxonomyList.hasOwnProperty( taxonomy ) &&
			taxonomyList[ taxonomy ].hierarchical
		) {
			tree = _getTermTree( terms, 0, 0 );
		} else {
			tree = tree.map( ( value ) => {
				return {
					value: value.slug,
					label: value.name,
				};
			} );
		}

		return {
			termOptions: [ _getOptionsDefault(), ...tree ],
		};
	} );

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
					<PanelBody
						initialOpen={ false }
						title={ __( '絞り込み設定', 'ystandard-toolbox' ) }
					>
						<SelectControl
							label={ __( '投稿タイプ', 'ystandard-toolbox' ) }
							value={ postType }
							options={ postTypesOptions }
							onChange={ ( value ) => {
								setAttributes( {
									postType: value,
									postIn: '',
									postNameIn: '',
									postParent: '',
								} );
							} }
						/>
						<SelectControl
							label={ __( '分類', 'ystandard-toolbox' ) }
							value={ taxonomy }
							options={ taxonomyOptions() }
							onChange={ ( value ) => {
								setAttributes( {
									taxonomy: value,
									postIn: '',
									postNameIn: '',
									postParent: '',
								} );
							} }
						/>
						{ !! taxonomy && (
							<SelectControl
								label={ __(
									'カテゴリー・タグ',
									'ystandard-toolbox'
								) }
								value={ termSlug }
								options={ termOptions }
								onChange={ ( value ) => {
									setAttributes( {
										termSlug: value,
										postIn: '',
										postNameIn: '',
										postParent: '',
									} );
								} }
							/>
						) }
					</PanelBody>
					<PanelBody
						initialOpen={ false }
						title={ __( '高度な絞り込み', 'ystandard-toolbox' ) }
					>
						<BaseControl>
							<TextControl
								label={ __(
									'投稿ID指定',
									'ystandard-toolbox'
								) }
								value={ postIn }
								onChange={ ( value ) => {
									setAttributes( {
										taxonomy: '',
										termSlug: '',
										postIn: value,
										postNameIn: '',
										postParent: '',
									} );
								} }
							/>
						</BaseControl>
						<BaseControl>
							<TextControl
								label={ __(
									'投稿名指定',
									'ystandard-toolbox'
								) }
								value={ postNameIn }
								onChange={ ( value ) => {
									setAttributes( {
										taxonomy: '',
										termSlug: '',
										postIn: '',
										postNameIn: value,
										postParent: '',
									} );
								} }
							/>
						</BaseControl>
						{ 0 < hierarchicalPosts.length && (
							<BaseControl>
								<SelectControl
									label={ __(
										'親ページ指定',
										'ystandard-toolbox'
									) }
									value={ postParent }
									options={ hierarchicalPosts }
									onChange={ ( value ) => {
										setAttributes( {
											taxonomy: '',
											termSlug: '',
											postIn: '',
											postNameIn: '',
											postParent: value,
										} );
									} }
								/>
							</BaseControl>
						) }
					</PanelBody>
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
