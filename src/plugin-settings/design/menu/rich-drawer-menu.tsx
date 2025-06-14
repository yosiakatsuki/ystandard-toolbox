/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * Aktk Dependencies
 */
import HorizonButtons from '@aktk/components/horizon-buttons';
import Notice from '@aktk/components/notice';
import { toBool } from '@aktk/block-components/utils/boolean';
/**
 * Plugin Dependencies
 */
import {
	PluginSettingsPanel,
	PanelInner,
} from '@aktk/plugin-settings/components/panel';
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import { PanelProps } from './index';

export default function RichDrawerMenu( {
	updateSection,
	sectionSettings,
}: PanelProps ): JSX.Element {
	const enableRichDrawerMenu = toBool(
		sectionSettings?.mobileMenuEnable ?? false
	);

	const handleOnChangeEnable = ( newValue: { value: boolean } ): void => {
		updateSection( {
			mobileMenuEnable: newValue.value,
		} );
	};
	const handleOnChangeHideGlobalMenu = ( newValue: {
		value: boolean;
	} ): void => {
		updateSection( {
			mobileMenuHideGlobalMenu: newValue.value,
		} );
	};
	const handleOnChangeHideSearch = ( newValue: { value: boolean } ): void => {
		updateSection( {
			mobileMenuHideSearch: newValue.value,
		} );
	};
	return (
		<PluginSettingsPanel title={ __( 'リッチドロワーメニュー', 'ystandard-toolbox' ) }>
			<PanelInner>
				<PluginSettingsBaseControl
					label={ __( '有効 / 無効', 'ystandard-toolbox' ) }
					id={ 'enable' }
				>
					<HorizonButtons
						primary={ enableRichDrawerMenu }
						items={ [
							{
								name: 'true',
								label: __( 'ON', 'ystandard-toolbox' ),
								value: true,
							},
							{
								name: 'false',
								label: __( 'OFF', 'ystandard-toolbox' ),
								value: false,
							},
						] }
						onChange={ handleOnChangeEnable }
					/>
				</PluginSettingsBaseControl>
				{ toBool( enableRichDrawerMenu ) && (
					<>
						<PluginSettingsBaseControl
							label={ __( 'グローバルメニューの表示', 'ystandard-toolbox' ) }
							id={ 'global-menu' }
						>
							<Notice
								isHelp
								style={ { fontSize: '12px', paddingTop: 0 } }
							>
								{ __( 'ドロワーメニュー内のグローバルメニューの表示/非表示を設定します。', 'ystandard-toolbox' ) }
							</Notice>
							<HorizonButtons
								primary={ toBool(
									sectionSettings?.mobileMenuHideGlobalMenu ??
										false
								) }
								items={ [
									{
										name: 'false',
										label: __( '表示', 'ystandard-toolbox' ),
										value: false,
									},
									{
										name: 'true',
										label: __( '非表示', 'ystandard-toolbox' ),
										value: true,
									},
								] }
								onChange={ handleOnChangeHideGlobalMenu }
							/>
						</PluginSettingsBaseControl>
						<PluginSettingsBaseControl
							label={ __( '検索フォームの表示', 'ystandard-toolbox' ) }
							id={ 'search' }
						>
							<Notice
								isHelp
								style={ { fontSize: '12px', paddingTop: 0 } }
							>
								{ __( 'ドロワーメニュー内の検索フォームの表示/非表示を設定します。', 'ystandard-toolbox' ) }
							</Notice>
							<HorizonButtons
								primary={ toBool(
									sectionSettings?.mobileMenuHideSearch ?? false
								) }
								items={ [
									{
										name: 'false',
										label: __( '表示', 'ystandard-toolbox' ),
										value: false,
									},
									{
										name: 'true',
										label: __( '非表示', 'ystandard-toolbox' ),
										value: true,
									},
								] }
								onChange={ handleOnChangeHideSearch }
							/>
						</PluginSettingsBaseControl>
					</>
				) }
			</PanelInner>
		</PluginSettingsPanel>
	);
}
