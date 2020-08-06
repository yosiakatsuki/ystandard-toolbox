import {
	orderbySelect,
	listTypeSelect,
	thumbnailRatioSelect
} from './config';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import { InspectorControls } from '@wordpress/block-editor';
import { PostTaxonomies } from '@wordpress/editor';
import {
	PanelBody,
	BaseControl,
	ToggleControl,
	TextControl,
	RangeControl,
	RadioControl,
	SelectControl,
	Button,
	ServerSideRender,
	Disabled
} from '@wordpress/components';
import _toNumber from "../../src/js/blocks/function/_toNumber";
import _getOptionsDefault from "../../src/js/blocks/function/_getOptionsDefault";
import _getTermTree from "../../src/js/blocks/function/_getTermTree";

const Posts = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;
	const {
		count,
		orderby,
		order,
		listType,
		colMobile,
		colTablet,
		colPc,
		taxonomy,
		termSlug,
		showImg,
		showDate,
		showCategory,
		showExcerpt,
		thumbnailSize,
		thumbnailRatio,
		postType,
		postIn,
		postNameIn,
		postParent,
	} = attributes;

	const {
		imageSizes,
		postTypes,
		taxonomyList
	} = useSelect( ( select ) => {
		const { getSettings } = select( 'core/block-editor' );
		const { getPostTypes, getTaxonomy } = select( 'core' );
		let postTypes = getPostTypes() ? getPostTypes() : [];
		let _taxonomy = getTaxonomy() ? getTaxonomy() : [];
		return {
			imageSizes: getSettings()[ 'imageSizes' ],
			postTypes: postTypes.filter( ( type ) => {
				return ! ( ! type.viewable || 'ys-parts' === type.slug || 'attachment' === type.slug );
			} ),
			taxonomyList: _taxonomy
		}
	} );


	const imageSizesOptions = imageSizes.map( ( { name, slug } ) => ( { value: slug, label: name } ) );
	const postTypesOptions = postTypes.map( ( { name, slug } ) => ( { value: slug, label: name } ) );

	const selectedPostType = postTypes.filter( ( type ) => {
		return type.slug === postType;
	} );

	const taxonomyOptions = () => {
		const taxonomy = selectedPostType.length ? selectedPostType[ 0 ].taxonomies : [];
		return [
			_getOptionsDefault(),
			...taxonomy.map( ( value ) => {
				if ( taxonomyList.hasOwnProperty( value ) ) {
					return {
						value: taxonomyList[ value ].slug,
						label: taxonomyList[ value ].name
					}
				}
			} ),
		];
	};
	const { termOptions } = useSelect( ( select ) => {
		const { getEntityRecords } = select( 'core' );
		let terms = getEntityRecords(
			'taxonomy',
			taxonomy,
			{
				per_page: -1,
			}
		);
		if ( ! terms ) {
			terms = [];
		}
		const tree = _getTermTree( terms, 0, 0 );

		return {
			termOptions: [
				_getOptionsDefault(),
				...tree
			]
		};
	} );

	const orderSelected = `${ orderby }/${ order }`;

	return (
		<div className={ 'ystdtb-posts' }>
			<Fragment>
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
								const order = value.split( '/' );
								setAttributes( {
									orderby: order[0],
									order: order[1],
								} );
							} }
						/>
					</PanelBody>
					<PanelBody title={ __( '表示設定', 'ystandard-toolbox' ) }>
						<SelectControl
							label={ __( '表示タイプ', 'ystandard-toolbox' ) }
							value={ listType }
							options={ listTypeSelect }
							onChange={ ( value ) => {
								setAttributes( { listType: value } )
							} }
						/>
						<RangeControl
							label={ __( 'PC', 'ystandard-toolbox' ) }
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
					<PanelBody
						title={ __( '画像設定', 'ystandard-toolbox' ) }
					>
						<ToggleControl
							label={ __( '画像を表示する', 'ystandard-toolbox' ) }
							onChange={ () => {
								setAttributes( {
									showImg: ! showImg,
								} );
							} }
							checked={ showImg }
						/>
						<SelectControl
							label={ __( '画像サイズ', 'ystandard-toolbox' ) }
							value={ thumbnailSize }
							options={ imageSizesOptions }
							onChange={ ( value ) => {
								setAttributes( { thumbnailSize: value } )
							} }
						/>
						<SelectControl
							label={ __( '画像縦横比', 'ystandard-toolbox' ) }
							value={ thumbnailRatio }
							options={ thumbnailRatioSelect }
							onChange={ ( value ) => {
								setAttributes( { thumbnailRatio: value } )
							} }
						/>
					</PanelBody>
					<PanelBody
						initialOpen={ false }
						title={ __( '日付・カテゴリー・概要', 'ystandard-toolbox' ) }
					>
						<ToggleControl
							label={ __( '日付を表示する', 'ystandard-toolbox' ) }
							onChange={ () => {
								setAttributes( {
									showDate: ! showDate,
								} );
							} }
							checked={ showDate }
						/>
						<ToggleControl
							label={ __( 'カテゴリーを表示する', 'ystandard-toolbox' ) }
							onChange={ () => {
								setAttributes( {
									showCategory: ! showCategory,
								} );
							} }
							checked={ showCategory }
						/>
						<ToggleControl
							label={ __( '概要を表示する', 'ystandard-toolbox' ) }
							onChange={ () => {
								setAttributes( {
									showExcerpt: ! showExcerpt,
								} );
							} }
							checked={ showExcerpt }
						/>
					</PanelBody>
					<PanelBody
						title={ __( '絞り込み設定', 'ystandard-toolbox' ) }
					>
						<SelectControl
							label={ __( '投稿タイプ', 'ystandard-toolbox' ) }
							value={ postType }
							options={ postTypesOptions }
							onChange={ ( value ) => {
								setAttributes( { postType: value } )
							} }
						/>
						<SelectControl
							label={ __( '分類', 'ystandard-toolbox' ) }
							value={ taxonomy }
							options={ taxonomyOptions() }
							onChange={ ( value ) => {
								setAttributes( { taxonomy: value } )
							} }
						/>
						{ !! taxonomy &&
						<SelectControl
							label={ __( 'カテゴリー・タグ', 'ystandard-toolbox' ) }
							value={ termSlug }
							options={ termOptions }
							onChange={ ( value ) => {
								setAttributes( { termSlug: value } )
							} }
						/>
						}
					</PanelBody>
				</InspectorControls>
			</Fragment>
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
