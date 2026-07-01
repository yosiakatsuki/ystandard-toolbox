/**
 * WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies.
 */
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';

const PANEL_ID = 'ystdtb-icon-list-responsive-font-size';

/**
 * レスポンシブフォントサイズ設定.
 */
export function FontSize(): JSX.Element {
	// 空パネルのリセット処理.
	const handleOnReset = () => {};

	return (
		<ToolsPanel
			label={ __( 'レスポンシブフォントサイズ', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ handleOnReset }
		>
			<ToolsPanelItem
				label={ __( 'フォントサイズ', 'ystandard-toolbox' ) }
				panelId={ PANEL_ID }
				hasValue={ () => false }
				onDeselect={ handleOnReset }
			/>
		</ToolsPanel>
	);
}
