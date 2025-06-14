/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * Aktk Dependencies
 */
import { HorizonButtonSelect } from '@aktk/block-components/components/buttons';
import { NoticeSecondaryText } from '@aktk/block-components/components/notice';
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

	const handleOnChangeEnable = (
		newValue: string | number | boolean
	): void => {
		updateSection( {
			mobileMenuEnable: toBool( newValue ),
		} );
	};
	const handleOnChangeHideGlobalMenu = (
		newValue: string | number | boolean
	): void => {
		updateSection( {
			mobileMenuHideGlobalMenu: toBool( newValue ),
		} );
	};
	const handleOnChangeHideSearch = (
		newValue: string | number | boolean
	): void => {
		updateSection( {
			mobileMenuHideSearch: toBool( newValue ),
		} );
	};
	return (
		<PluginSettingsPanel
			title={ __( 'リッチドロワーメニュー', 'ystandard-toolbox' ) }
		>
			<PanelInner>
				<PluginSettingsBaseControl
					label={ __( '有効 / 無効', 'ystandard-toolbox' ) }
					id={ 'enable' }
				>
					<HorizonButtonSelect
						value={ toBool( enableRichDrawerMenu ) }
						onChange={ handleOnChangeEnable }
						options={ [
							{
								value: true,
								label: __( 'ON', 'ystandard-toolbox' ),
							},
							{
								value: false,
								label: __( 'OFF', 'ystandard-toolbox' ),
							},
						] }
					/>
				</PluginSettingsBaseControl>
				{ toBool( enableRichDrawerMenu ) && (
					<>
						<PluginSettingsBaseControl
							label={ __(
								'グローバルメニューの表示',
								'ystandard-toolbox'
							) }
							id={ 'global-menu' }
						>
							<NoticeSecondaryText className="mb-1">
								{ __(
									'ドロワーメニュー内のグローバルメニューの表示/非表示を設定します。',
									'ystandard-toolbox'
								) }
							</NoticeSecondaryText>
							<HorizonButtonSelect
								value={ toBool(
									sectionSettings?.mobileMenuHideGlobalMenu ??
										false
								) }
								onChange={ handleOnChangeHideGlobalMenu }
								options={ [
									{
										value: false,
										label: __(
											'表示',
											'ystandard-toolbox'
										),
									},
									{
										value: true,
										label: __(
											'非表示',
											'ystandard-toolbox'
										),
									},
								] }
							/>
						</PluginSettingsBaseControl>
						<PluginSettingsBaseControl
							label={ __(
								'検索フォームの表示',
								'ystandard-toolbox'
							) }
							id={ 'search' }
						>
							<NoticeSecondaryText className="mb-1">
								{ __(
									'ドロワーメニュー内の検索フォームの表示/非表示を設定します。',
									'ystandard-toolbox'
								) }
							</NoticeSecondaryText>
							<HorizonButtonSelect
								value={ toBool(
									sectionSettings?.mobileMenuHideSearch ??
										false
								) }
								onChange={ handleOnChangeHideSearch }
								options={ [
									{
										value: false,
										label: __(
											'表示',
											'ystandard-toolbox'
										),
									},
									{
										value: true,
										label: __(
											'非表示',
											'ystandard-toolbox'
										),
									},
								] }
							/>
						</PluginSettingsBaseControl>
					</>
				) }
			</PanelInner>
		</PluginSettingsPanel>
	);
}
