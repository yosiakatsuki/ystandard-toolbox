/**
 * WordPress
 */
import { PanelBody } from '@wordpress/components';
/**
 * yStandard
 */
import MediaUploadControl from '@aktk/components/media-upload-control';
import Notice from '@aktk/components/notice';
import CustomSelectControl from '@aktk/components/custom-select-control';
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';

const RATIO = [
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

const Image = ( { updateSection, sectionSettings } ) => {
	const defaultImage = !! sectionSettings?.archiveDefaultImage
		? {
				id: sectionSettings?.archiveDefaultImageId ?? 0,
				url: sectionSettings?.archiveDefaultImage,
		  }
		: undefined;

	const handleOnSelectImage = ( newValue ) => {
		updateSection( {
			archiveDefaultImage: newValue.url,
			archiveDefaultImageId: newValue.id,
		} );
	};
	const handleOnClearImage = () => {
		updateSection( {
			archiveDefaultImage: undefined,
			archiveDefaultImageId: undefined,
		} );
	};
	const handleOnChangeRatioDesktop = ( newValue ) => {
		updateSection( {
			archiveImageRatio: newValue,
		} );
	};
	const handleOnChangeRatioMobile = ( newValue ) => {
		updateSection( {
			archiveImageRatioMobile: newValue,
		} );
	};
	const customSelectStyle = {
		'--aktk-custom-select-control-label-width': '160px',
		marginTop: '8px',
	};
	return (
		<PanelBody title={ '画像' }>
			<PluginSettingsBaseControl
				label={ '投稿一覧デフォルト画像' }
				id={ 'default-image' }
			>
				<Notice
					isHelp
					style={ {
						fontSize: '12px',
						maxWidth: '100%',
						paddingTop: 0,
					} }
				>
					投稿一覧でアイキャッチ画像がなかった場合に表示される画像の設定
				</Notice>
				<MediaUploadControl.Utils
					media={ defaultImage }
					value={ defaultImage }
					onSelect={ handleOnSelectImage }
					onClear={ handleOnClearImage }
				/>
			</PluginSettingsBaseControl>
			<PluginSettingsBaseControl
				label={ '画像縦横比' }
				id={ 'ratio' }
				isFullWidth
			>
				<Notice
					isHelp
					style={ {
						fontSize: '12px',
						maxWidth: '100%',
						paddingTop: 0,
					} }
				>
					投稿一覧ページ画像の縦横比の設定
					<br />
					※モバイル用レイアウトが設定されている場合、「デスクトップ・タブレット」と「モバイル」で別々の縦横比を設定できます。
				</Notice>
				<div style={ customSelectStyle }>
					<CustomSelectControl
						label={ 'デスクトップ・タブレット' }
						options={ RATIO }
						value={ sectionSettings?.archiveImageRatio ?? '16-9' }
						onChange={ handleOnChangeRatioDesktop }
						isHorizon
					/>
					{ !! sectionSettings?.archiveMobileLayout && (
						<CustomSelectControl
							label={ 'モバイル' }
							options={ RATIO }
							value={ sectionSettings?.archiveImageRatioMobile }
							onChange={ handleOnChangeRatioMobile }
							isHorizon
						/>
					) }
				</div>
			</PluginSettingsBaseControl>
		</PanelBody>
	);
};
export default Image;
