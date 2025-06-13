import { unescape as unescapeString, without } from 'lodash';
/**
 * WordPress
 */
import { CheckboxControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
/**
 * Aktk Dependencies
 */
import { HorizonButtonSelect } from '@aktk/block-components/components/buttons';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';
import { toBool } from '@aktk/block-components/utils/boolean';
import MediaUploadControl from '@aktk/components/media-upload-control';
/**
 * Plugin Dependencies
 */
import {
	PluginSettingsPanel,
	PanelInner,
} from '@aktk/plugin-settings/components/panel';
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
/**
 * Section
 */
import { PanelProps } from './index';

interface PostType {
	name: string;
	slug: string;
	visibility?: {
		show_ui: boolean;
	};
	viewable?: boolean;
}

interface OverlayType {
	name: string;
	slug: string;
}

interface MediaItem {
	id: number;
	url: string;
}

export default function Overlay( {
	updateSection,
	sectionSettings,
}: PanelProps ): React.ReactElement {
	const overlayEnable = sectionSettings?.enableOverlay ?? false;
	const overlayPageType = sectionSettings?.overlayPageType || [];

	const { postTypes } = useSelect( ( select ) => {
		const { getPostTypes } = select( coreStore );
		const _postTypes = getPostTypes( { per_page: -1 } ) ?? [];
		return {
			postTypes: _postTypes.filter( ( item: PostType ) => {
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

	const getOverlayTypes = (): OverlayType[] => {
		let types: OverlayType[] = [];
		if ( postTypes ) {
			types = postTypes.map( ( item: PostType ) => {
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

	const overlayImage: MediaItem | undefined = !! sectionSettings?.overlayImage
		? {
				id: sectionSettings?.overlayImageId,
				url: sectionSettings?.overlayImage,
		  }
		: undefined;

	const handleOnChangeEnable = ( newValue: string | number | boolean ) => {
		updateSection( { enableOverlay: toBool( newValue ) } );
	};

	const handleOnChangeTypes = ( checked: string ) => {
		const hasType = overlayPageType.includes( checked );
		const newTypes = hasType
			? without( overlayPageType, checked )
			: [ ...overlayPageType, checked ];
		updateSection( { overlayPageType: newTypes } );
	};

	const handleOnSelectLogo = ( newValue: MediaItem ) => {
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

	const handleOnChangeTextColor = ( newValue: string ) => {
		updateSection( {
			overlayTextColor: newValue,
		} );
	};

	return (
		<PluginSettingsPanel title={ 'ヘッダーオーバーレイ' }>
			<PanelInner>
				<PluginSettingsBaseControl
					label={ '有効 / 無効' }
					id={ 'enable-overlay' }
				>
					<HorizonButtonSelect
						value={ toBool( overlayEnable ) }
						onChange={ handleOnChangeEnable }
						options={ [
							{
								value: true,
								label: 'ON',
							},
							{
								value: false,
								label: 'OFF',
							},
						] }
					/>
				</PluginSettingsBaseControl>
				{ toBool( overlayEnable ) && (
					<>
						<PluginSettingsBaseControl
							label={ 'ページタイプ' }
							id={ 'page-type' }
						>
							{ getOverlayTypes().map( ( type ) => {
								return (
									<CheckboxControl
										key={ type.slug }
										checked={
											overlayPageType.indexOf(
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
						</PluginSettingsBaseControl>
						<PluginSettingsBaseControl
							label={ 'ロゴ画像' }
							id={ 'site-logo' }
						>
							<MediaUploadControl.Utils
								value={ overlayImage }
								media={ overlayImage }
								onSelect={ handleOnSelectLogo }
								onClear={ handleOnClearLogo }
							/>
						</PluginSettingsBaseControl>
						<PluginSettingsBaseControl
							label={ '文字色' }
							id={ 'text-color' }
						>
							<ColorPalette
								label={ '文字色' }
								value={ sectionSettings?.overlayTextColor }
								onChange={ handleOnChangeTextColor }
							/>
						</PluginSettingsBaseControl>
					</>
				) }
			</PanelInner>
		</PluginSettingsPanel>
	);
}
