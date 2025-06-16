/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * Aktk Dependencies
 */
import MediaUploadControl from '@aktk/components/media-upload-control';
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';
import { NoticeSecondaryText } from '@aktk/block-components/components/notice';
/**
 * Plugin Dependencies
 */
import {
	PluginSettingsPanel,
	PanelInner,
} from '@aktk/plugin-settings/components/panel';
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import { PanelProps } from './index';

interface RatioOption {
	key: string;
	name: string;
}

interface MediaObject {
	id: number;
	url: string;
}

const RATIO: RatioOption[] = [
	{
		key: '16-9',
		name: '16:9',
	},
	{
		key: '4-3',
		name: '4:3',
	},
	{
		key: '3-2',
		name: '3:2',
	},
	{
		key: '3-1',
		name: '3:1',
	},
	{
		key: '2-1',
		name: '2:1',
	},
	{
		key: '1-1',
		name: '1:1',
	},
];

export default function Image( {
	updateSection,
	sectionSettings,
}: PanelProps ): JSX.Element {
	const defaultImage: MediaObject | undefined =
		!! sectionSettings?.archiveDefaultImage
			? {
					id: sectionSettings?.archiveDefaultImageId ?? 0,
					url: sectionSettings?.archiveDefaultImage,
			  }
			: undefined;

	const handleOnSelectImage = ( newValue: MediaObject ): void => {
		updateSection( {
			archiveDefaultImage: newValue.url,
			archiveDefaultImageId: newValue.id,
		} );
	};
	const handleOnClearImage = (): void => {
		updateSection( {
			archiveDefaultImage: undefined,
			archiveDefaultImageId: undefined,
		} );
	};
	const handleOnChangeRatioDesktop = ( newValue: string ): void => {
		updateSection( {
			archiveImageRatio: newValue,
		} );
	};
	const handleOnChangeRatioMobile = ( newValue: string ): void => {
		updateSection( {
			archiveImageRatioMobile: newValue,
		} );
	};
	return (
		<PluginSettingsPanel title={ __( '画像', 'ystandard-toolbox' ) }>
			<PanelInner>
				<PluginSettingsBaseControl
					label={ __(
						'投稿一覧デフォルト画像',
						'ystandard-toolbox'
					) }
					id={ 'default-image' }
				>
					<NoticeSecondaryText className="mb-1">
						{ __(
							'投稿一覧でアイキャッチ画像がなかった場合に表示される画像の設定',
							'ystandard-toolbox'
						) }
					</NoticeSecondaryText>
					<MediaUploadControl.Utils
						media={ defaultImage }
						value={ defaultImage }
						onSelect={ handleOnSelectImage }
						onClear={ handleOnClearImage }
					/>
				</PluginSettingsBaseControl>
				<PluginSettingsBaseControl
					label={ __( '画像縦横比', 'ystandard-toolbox' ) }
					id={ 'ratio' }
					isFullWidth
				>
					<NoticeSecondaryText className="mb-1">
						{ __(
							'投稿一覧ページ画像の縦横比の設定',
							'ystandard-toolbox'
						) }
						<br />
						{ __(
							'※モバイル用レイアウトが設定されている場合、「デスクトップ・タブレット」と「モバイル」で別々の縦横比を設定できます。',
							'ystandard-toolbox'
						) }
					</NoticeSecondaryText>
					<div className="mt-4 grid grid-cols-1 gap-4">
						<PluginSettingsBaseControl>
							<CustomSelectControl
								label={ __(
									'デスクトップ・タブレット',
									'ystandard-toolbox'
								) }
								options={ RATIO }
								value={
									sectionSettings?.archiveImageRatio ?? '16-9'
								}
								onChange={ handleOnChangeRatioDesktop }
							/>
						</PluginSettingsBaseControl>
						{ !! sectionSettings?.archiveMobileLayout && (
							<PluginSettingsBaseControl>
								<CustomSelectControl
									label={ __(
										'モバイル',
										'ystandard-toolbox'
									) }
									options={ RATIO }
									value={
										sectionSettings?.archiveImageRatioMobile ||
										''
									}
									onChange={ handleOnChangeRatioMobile }
								/>
							</PluginSettingsBaseControl>
						) }
					</div>
				</PluginSettingsBaseControl>
			</PanelInner>
		</PluginSettingsPanel>
	);
}
