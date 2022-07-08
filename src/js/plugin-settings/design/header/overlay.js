import { unescape as unescapeString, without } from 'lodash';
/**
 * WordPress
 */
import { PanelBody, CheckboxControl } from '@wordpress/components';
import { useContext, useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
/**
 * yStandard
 */
import { DesignContext } from '../index';
import HorizonButtons from '@aktk/components/horizon-buttons';
import ColorPaletteControl from '@aktk/components/color-palette-control';
import { toBool } from '@aktk/helper/boolean.js';
import MediaUploadControl from '@aktk/components/media-upload-control';
import BaseControl from '../../component/base-control';
import { getEditorColors } from '../../function/config';
import { getOverlayImageId } from './function/overlay';

const SECTION_NAME = 'header_design';

const Overlay = ( props ) => {
	const { updateSection } = props;
	const [ overlaySettings, setOverlaySettings ] = useState( {} );
	const { getSettings, settings } = useContext( DesignContext );
	const getOverlaySettings = () => {
		const _settings = getSettings( SECTION_NAME );
		const imageId = _settings?.overlayImageId ?? getOverlayImageId();
		setOverlaySettings( {
			enable: _settings?.enableOverlay ?? false,
			image: _settings?.overlayImage,
			imageId,
			pageType: _settings?.overlayPageType || [],
			color: _settings?.overlayTextColor,
		} );
		return overlaySettings;
	};
	useEffect( getOverlaySettings, [ settings ] );

	const { postTypes } = useSelect( ( select ) => {
		const { getPostTypes } = select( coreStore );
		const _postTypes = getPostTypes( { per_page: -1 } ) ?? [];
		return {
			postTypes: _postTypes.filter( ( item ) => {
				if (
					'ys-parts' === item?.slug ||
					'attachment' === item?.slug
				) {
					return false;
				}
				return item?.visibility?.show_ui && item?.viewable;
			} ),
		};
	} );
	const getOverlayTypes = () => {
		let types = [];
		if ( postTypes ) {
			types = postTypes.map( ( item ) => {
				return {
					name: item?.name,
					slug: item?.slug,
				};
			} );
		}
		return [
			{
				name: 'フロントページ(TOPページ)',
				slug: 'front-page',
			},
			...types,
		];
	};

	const overlayImage = !! overlaySettings.image
		? {
				id: overlaySettings.imageId,
				url: overlaySettings.image,
		  }
		: undefined;

	const updateOverlay = ( newValue ) => {
		updateSection( SECTION_NAME, newValue );
	};
	const handleOnChangeEnable = ( newValue ) => {
		updateOverlay( { enableOverlay: toBool( newValue?.value ) } );
	};
	const handleOnChangeTypes = ( checked ) => {
		const hasType = overlaySettings.pageType.includes( checked );
		const newTypes = hasType
			? without( overlaySettings.pageType, checked )
			: [ ...overlaySettings.pageType, checked ];
		updateOverlay( { overlayPageType: newTypes } );
	};
	const handleOnSelectLogo = ( newValue ) => {
		updateOverlay( {
			overlayImage: newValue.url,
			overlayImageId: newValue.id,
		} );
	};
	const handleOnClearLogo = () => {
		updateOverlay( {
			overlayImage: undefined,
			overlayImageId: undefined,
		} );
	};
	const handleOnChangeTextColor = ( newValue ) => {
		updateOverlay( {
			overlayTextColor: newValue,
		} );
	};
	return (
		<PanelBody title={ 'ヘッダーオーバーレイ' }>
			<BaseControl label={ '有効化' } id={ 'enable-overlay' }>
				<HorizonButtons
					items={ [
						{
							name: 'true',
							label: 'ON',
							value: true,
						},
						{
							name: 'false',
							label: 'OFF',
							value: false,
						},
					] }
					primary={ toBool( overlaySettings?.enable ) }
					onChange={ handleOnChangeEnable }
				/>
			</BaseControl>
			{ toBool( overlaySettings?.enable ) && (
				<>
					<BaseControl label={ 'ページタイプ' } id={ 'page-type' }>
						{ getOverlayTypes().map( ( type ) => {
							return (
								<CheckboxControl
									key={ type.slug }
									checked={
										overlaySettings.pageType.indexOf(
											type.slug
										) !== -1
									}
									onChange={ () => {
										handleOnChangeTypes( type.slug );
									} }
									label={ unescapeString( type.name ) }
								/>
							);
						} ) }
					</BaseControl>
					<BaseControl label={ 'ロゴ画像' } id={ 'site-logo' }>
						<MediaUploadControl.Utils
							value={ overlayImage }
							media={ overlayImage }
							onSelect={ handleOnSelectLogo }
							onClear={ handleOnClearLogo }
						/>
					</BaseControl>
					<BaseControl label={ '文字色' } id={ 'text-color' }>
						<ColorPaletteControl
							label={ '文字色' }
							value={ overlaySettings?.color }
							onChange={ handleOnChangeTextColor }
							position={ 'right bottom' }
							colors={ getEditorColors() }
						/>
					</BaseControl>
				</>
			) }
		</PanelBody>
	);
};
export default Overlay;
