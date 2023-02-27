import { unescape as unescapeString, without } from 'lodash';
/**
 * WordPress
 */
import { PanelBody, CheckboxControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
/**
 * yStandard
 */
import HorizonButtons from '@aktk/components/horizon-buttons';
import ColorPaletteControl from '@aktk/components/color-palette-control';
import { toBool } from '@aktk/helper/boolean.js';
import MediaUploadControl from '@aktk/components/media-upload-control';
import BaseControl from '@aktk/plugin-settings/components/base-control';
import { getEditorColors } from '@aktk/plugin-settings/function/config';

const Overlay = ( { updateSection, sectionSettings } ) => {
	const overlayEnable = sectionSettings?.enableOverlay ?? false;
	const overlayPageType = sectionSettings?.overlayPageType || [];

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

	const overlayImage = !! sectionSettings?.overlayImage
		? {
				id: sectionSettings?.overlayImageId,
				url: sectionSettings?.overlayImage,
		  }
		: undefined;

	const handleOnChangeEnable = ( newValue ) => {
		updateSection( { enableOverlay: toBool( newValue?.value ) } );
	};
	const handleOnChangeTypes = ( checked ) => {
		const hasType = overlayPageType.includes( checked );
		const newTypes = hasType
			? without( overlayPageType, checked )
			: [ ...overlayPageType, checked ];
		updateSection( { overlayPageType: newTypes } );
	};
	const handleOnSelectLogo = ( newValue ) => {
		updateSection( {
			overlayImage: newValue.url,
			overlayImageId: newValue.id,
		} );
	};
	const handleOnClearLogo = () => {
		updateSection( {
			overlayImage: undefined,
			overlayImageId: undefined,
		} );
	};
	const handleOnChangeTextColor = ( newValue ) => {
		updateSection( {
			overlayTextColor: newValue,
		} );
	};
	return (
		<PanelBody title={ 'ヘッダーオーバーレイ' }>
			<BaseControl label={ '有効 / 無効' } id={ 'enable-overlay' }>
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
					primary={ toBool( overlayEnable ) }
					onChange={ handleOnChangeEnable }
				/>
			</BaseControl>
			{ toBool( overlayEnable ) && (
				<>
					<BaseControl label={ 'ページタイプ' } id={ 'page-type' }>
						{ getOverlayTypes().map( ( type ) => {
							return (
								<CheckboxControl
									key={ type.slug }
									checked={
										overlayPageType.indexOf( type.slug ) !==
										-1
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
							value={ sectionSettings?.overlayTextColor }
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
