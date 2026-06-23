import React from 'react';
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Plugin Dependencies
 */
import { PluginSettingsPanel } from '@aktk/plugin-settings/components/panel';
import DisableCorePattern from './disable-core-pattern';

/**
 * WordPressコアブロックパターン設定のメインコンポーネント
 * WordPressの標準ブロックパターンの有効・無効を制御する
 */
export default function CorePattern(): JSX.Element {
	return (
		<PluginSettingsPanel title={ __( 'WordPress標準パターン', 'ystandard-toolbox' ) }>
			<DisableCorePattern />
		</PluginSettingsPanel>
	);
}
