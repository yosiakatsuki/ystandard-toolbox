/**
 * WordPress
 */
import { PanelBody } from '@wordpress/components';
/**
 * yStandard
 */
import CustomSelectControl from '@aktk/components/custom-select-control';
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';

const DISPLAY_DATE = [
	{
		key: '',
		name: '公開日(デフォルト)',
	},
	{
		key: 'modified',
		name: '更新日',
	},
];

const Date = ( { updateSection, sectionSettings } ) => {
	const handleOnChangeDisplayDate = ( newValue ) => {
		updateSection( {
			archiveDisplayDate: newValue,
		} );
	};
	return (
		<PanelBody title={ '日付情報' }>
			<PluginSettingsBaseControl>
				<CustomSelectControl
					label={ '日付表示' }
					options={ DISPLAY_DATE }
					value={ sectionSettings?.archiveDisplayDate }
					onChange={ handleOnChangeDisplayDate }
					isHorizon
				/>
			</PluginSettingsBaseControl>
		</PanelBody>
	);
};
export default Date;
