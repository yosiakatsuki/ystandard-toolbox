/**
 * Aktk Dependencies
 */
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';
import { HorizonButtonSelect } from '@aktk/block-components/components/buttons';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';
/**
 * yStandard
 */
import { migrateSubHeaderFontSize } from './utils/sub-header';

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

export default function SubHeader( {
	updateSection,
	sectionSettings,
}: PanelProps ): React.ReactElement {
	// サブヘッダーの設定を取得.
	const subHeaderFontSize =
		sectionSettings?.subHeaderFontSize ??
		migrateSubHeaderFontSize(
			{
				size: sectionSettings?.subHeaderFontSizeDesktop,
				unit: sectionSettings?.subHeaderFontSizeUnitDesktop,
			},
			'0.7em'
		);
	const handleOnChangeBackgroundColor = ( newValue?: string ) => {
		updateSection( {
			subHeaderBackgroundColorDesktop: newValue,
		} );
	};
	const handleOnChangeTextColor = ( newValue?: string ) => {
		updateSection( {
			subHeaderColorDesktop: newValue,
		} );
	};
	const handleOnChangeFontSize = ( newValue: string ) => {
		updateSection( {
			subHeaderFontSize: newValue,
		} );
	};
	const handleOnChangeAlign = ( newValue: string | number | boolean ) => {
		updateSection( {
			subHeaderAlignDesktop: ( newValue || undefined ) as
				| 'left'
				| 'center'
				| 'right'
				| undefined,
		} );
	};
	return (
		<PluginSettingsPanel title={ 'サブヘッダー' }>
			<PanelInner>
				<PluginSettingsBaseControl
					label={ '背景色' }
					id={ 'background-color' }
				>
					<ColorPalette
						label={ '背景色' }
						value={
							sectionSettings?.subHeaderBackgroundColorDesktop ??
							'#f1f1f3'
						}
						onChange={ handleOnChangeBackgroundColor }
						enableTransparent={ true }
					/>
				</PluginSettingsBaseControl>
				<PluginSettingsBaseControl
					label={ '文字色' }
					id={ 'text-color' }
				>
					<ColorPalette
						label={ '文字色' }
						value={
							sectionSettings?.subHeaderColorDesktop ?? '#666666'
						}
						onChange={ handleOnChangeTextColor }
					/>
				</PluginSettingsBaseControl>
				<PluginSettingsBaseControl
					label={ '表示位置' }
					id={ 'position' }
				>
					<HorizonButtonSelect
						value={
							sectionSettings?.subHeaderAlignDesktop ?? 'right'
						}
						onChange={ handleOnChangeAlign }
						options={ [
							{
								value: 'left',
								label: '左揃え',
							},
							{
								value: 'center',
								label: '中央揃え',
							},
							{
								value: 'right',
								label: '右揃え',
							},
						] }
					/>
				</PluginSettingsBaseControl>

				<PluginSettingsBaseControl
					label={ '文字サイズ' }
					id={ 'font-size' }
				>
					<UnitControl
						value={ subHeaderFontSize }
						onChange={ handleOnChangeFontSize }
					/>
				</PluginSettingsBaseControl>
			</PanelInner>
		</PluginSettingsPanel>
	);
}
