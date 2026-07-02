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
import BaseControl from '@aktk/block-components/wp-controls/base-control';

/**
 * Block Dependencies.
 */
import type { IconListEditProps } from '../../types';

const PANEL_ID = 'ystdtb-icon-list-responsive-font-size';

/**
 * レスポンシブ文字設定.
 */
export function Typography( props: IconListEditProps ): JSX.Element {
	// 空パネルのリセット処理.
	const handleOnReset = () => {};

	return (
		<ToolsPanel
			label={ __( 'レスポンシブ文字設定', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ handleOnReset }
		>
			<ToolsPanelItem
				label={ __( 'フォントサイズ', 'ystandard-toolbox' ) }
				panelId={ PANEL_ID }
				hasValue={ () => false }
				onDeselect={ handleOnReset }
			>
				<BaseControl
					label={ __( 'フォントサイズ', 'ystandard-toolbox' ) }
					help={ __(
						'レスポンシブ文字設定は、テーマのスタイルに依存します。',
						'ystandard-toolbox'
					) }
				>
					{ __(
						'レスポンシブ文字設定は、テーマのスタイルに依存します。',
						'ystandard-toolbox'
					) }
				</BaseControl>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
