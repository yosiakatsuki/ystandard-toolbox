/**
 * WordPress
 */
import { PanelBody } from '@wordpress/components';
/**
 * yStandard
 */
import ColorPaletteControl from '@aktk/components/color-palette-control';
import UnitControl from '@aktk/components/unit-control';
import HorizonButtons from '@aktk/components/horizon-buttons';
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import { migrateSubHeaderFontSize } from './function/sub-header';
import { getEditorColors } from '@aktk/plugin-settings/function/config';

const SubHeader = ( { updateSection, sectionSettings } ) => {
	const subHeaderFontSize =
		sectionSettings?.subHeaderFontSize ??
		migrateSubHeaderFontSize(
			{
				size: sectionSettings?.subHeaderFontSizeDesktop,
				unit: sectionSettings?.subHeaderFontSizeUnitDesktop,
			},
			'0.7em'
		);
	const handleOnChangeBackgroundColor = ( newValue ) => {
		updateSection( {
			subHeaderBackgroundColorDesktop: newValue,
		} );
	};
	const handleOnChangeTextColor = ( newValue ) => {
		updateSection( {
			subHeaderColorDesktop: newValue,
		} );
	};
	const handleOnChangeFontSize = ( newValue ) => {
		updateSection( {
			subHeaderFontSize: newValue,
		} );
	};
	const handleOnChangeAlign = ( newValue ) => {
		updateSection( {
			subHeaderAlignDesktop: newValue.name,
		} );
	};
	return (
		<PanelBody title={ 'サブヘッダー' }>
			<PluginSettingsBaseControl
				label={ '背景色' }
				id={ 'background-color' }
			>
				<ColorPaletteControl
					label={ '背景色' }
					value={
						sectionSettings?.subHeaderBackgroundColorDesktop ??
						'#f1f1f3'
					}
					onChange={ handleOnChangeBackgroundColor }
					position={ 'right bottom' }
					colors={ getEditorColors() }
				/>
			</PluginSettingsBaseControl>
			<PluginSettingsBaseControl label={ '文字色' } id={ 'text-color' }>
				<ColorPaletteControl
					label={ '文字色' }
					value={
						sectionSettings?.subHeaderColorDesktop ?? '#666666'
					}
					onChange={ handleOnChangeTextColor }
					position={ 'right bottom' }
					colors={ getEditorColors() }
				/>
			</PluginSettingsBaseControl>
			<PluginSettingsBaseControl label={ '表示位置' } id={ 'position' }>
				<HorizonButtons
					primary={
						sectionSettings?.subHeaderAlignDesktop ?? 'right'
					}
					items={ [
						{
							name: 'left',
							label: '左揃え',
						},
						{
							name: 'center',
							label: '中央揃え',
						},
						{
							name: 'right',
							label: '右揃え',
						},
					] }
					onChange={ handleOnChangeAlign }
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
		</PanelBody>
	);
};
export default SubHeader;
