/**
 * WordPress
 */
import { PanelBody } from '@wordpress/components';
/**
 * yStandard
 */
import HorizonButtons from '@aktk/components/horizon-buttons';
import Notice from '@aktk/components/notice';
import BaseControl from '@aktk/plugin-settings/components/base-control';
import { toBool } from '@aktk/helper/boolean.js';

const RichDrawerMenu = ( { updateSection, sectionSettings } ) => {
	const enableRichDrawerMenu = toBool(
		sectionSettings?.mobileMenuEnable ?? false
	);

	const handleOnChangeEnable = ( newValue ) => {
		updateSection( {
			mobileMenuEnable: newValue.value,
		} );
	};
	const handleOnChangeHideGlobalMenu = ( newValue ) => {
		updateSection( {
			mobileMenuHideGlobalMenu: newValue.value,
		} );
	};
	const handleOnChangeHideSearch = ( newValue ) => {
		updateSection( {
			mobileMenuHideSearch: newValue.value,
		} );
	};
	return (
		<PanelBody title={ 'リッチドロワーメニュー' }>
			<BaseControl label={ '有効 / 無効' } id={ 'enable' }>
				<HorizonButtons
					primary={ enableRichDrawerMenu }
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
					onChange={ handleOnChangeEnable }
				/>
			</BaseControl>
			{ toBool( enableRichDrawerMenu ) && (
				<>
					<BaseControl
						label={ 'グローバルメニューの表示' }
						id={ 'global-menu' }
					>
						<Notice
							isHelp
							style={ { fontSize: '12px', paddingTop: 0 } }
						>
							ドロワーメニュー内のグローバルメニューの表示/非表示を設定します。
						</Notice>
						<HorizonButtons
							primary={ toBool(
								sectionSettings?.mobileMenuHideGlobalMenu ??
									false
							) }
							items={ [
								{
									name: 'false',
									label: '表示',
									value: false,
								},
								{
									name: 'true',
									label: '非表示',
									value: true,
								},
							] }
							onChange={ handleOnChangeHideGlobalMenu }
						/>
					</BaseControl>
					<BaseControl label={ '検索フォームの表示' } id={ 'search' }>
						<Notice
							isHelp
							style={ { fontSize: '12px', paddingTop: 0 } }
						>
							ドロワーメニュー内の検索フォームの表示/非表示を設定します。
						</Notice>
						<HorizonButtons
							primary={ toBool(
								sectionSettings?.mobileMenuHideSearch ?? false
							) }
							items={ [
								{
									name: 'false',
									label: '表示',
									value: false,
								},
								{
									name: 'true',
									label: '非表示',
									value: true,
								},
							] }
							onChange={ handleOnChangeHideSearch }
						/>
					</BaseControl>
				</>
			) }
		</PanelBody>
	);
};

export default RichDrawerMenu;
