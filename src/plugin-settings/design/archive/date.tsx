/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';

/**
 * Plugin Dependencies
 */
import {
	PluginSettingsPanel,
	PanelInner,
} from '@aktk/plugin-settings/components/panel';
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import { PanelProps } from './index';

/**
 * 日付表示オプション
 */
interface DateOption {
	key: string;
	name: string;
}

const DISPLAY_DATE: DateOption[] = [
	{
		key: '',
		name: '公開日(デフォルト)',
	},
	{
		key: 'modified',
		name: '更新日',
	},
];

/**
 * 日付設定コンポーネント
 */
export default function Date({
	updateSection,
	sectionSettings,
}: PanelProps): JSX.Element {
	const handleOnChangeDisplayDate = (newValue: string): void => {
		updateSection({
			archiveDisplayDate: newValue,
		});
	};
	return (
		<PluginSettingsPanel title={__('日付情報', 'ystandard-toolbox')}>
			<PanelInner>
				<PluginSettingsBaseControl
					label={__('日付表示', 'ystandard-toolbox')}
					isFullWidth
				>
					<CustomSelectControl
						options={DISPLAY_DATE}
						value={sectionSettings?.archiveDisplayDate || ''}
						onChange={handleOnChangeDisplayDate}
					/>
				</PluginSettingsBaseControl>
			</PanelInner>
		</PluginSettingsPanel>
	);
}
