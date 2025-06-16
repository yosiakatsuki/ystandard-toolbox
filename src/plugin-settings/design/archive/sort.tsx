/**
 * WordPress
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

interface OrderOption {
	key: string;
	name: string;
}

const ORDER: OrderOption[] = [
	{ key: '', name: '公開日/降順(デフォルト)' },
	{ key: 'date/ASC', name: '公開日/昇順' },
	{ key: 'modified/DESC', name: '更新日/降順' },
	{ key: 'modified/ASC', name: '更新日/昇順' },
	{ key: 'title/ASC', name: 'タイトル/A-Z' },
	{ key: 'title/DESC', name: 'タイトル/Z-A' },
	{ key: 'rand/ASC', name: 'ランダム' },
];

export default function Sort( {
	updateSection,
	sectionSettings,
}: PanelProps ): JSX.Element {
	const handleOnChangeOrder = ( newValue: string ): void => {
		updateSection( {
			archiveOrder: newValue,
		} );
	};
	return (
		<PluginSettingsPanel title={ __( '並び順', 'ystandard-toolbox' ) }>
			<PanelInner>
				<PluginSettingsBaseControl
					label={ __( '投稿の並び順', 'ystandard-toolbox' ) }
					isFullWidth
				>
					<CustomSelectControl
						options={ ORDER }
						value={ sectionSettings?.archiveOrder || '' }
						onChange={ handleOnChangeOrder }
					/>
				</PluginSettingsBaseControl>
			</PanelInner>
		</PluginSettingsPanel>
	);
}
