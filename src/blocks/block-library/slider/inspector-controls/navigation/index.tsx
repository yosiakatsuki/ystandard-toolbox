/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';

/**
 * Block dependencies.
 */
import type { SliderEditProps } from '../../types';
// 設定.
import { HasNavigation } from './has-navigation';

/**
 * 矢印（ナビゲーション）の表示を切り替えるパネル.
 *
 * @param props スライダーの編集プロパティ.
 */
export function Navigation( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes, clientId } = props;
	const panelId = clientId + '-navigation';

	// 矢印を非表示に戻す.
	const resetNavigation = () => {
		setAttributes( { hasNavigation: false } );
	};

	return (
		<ToolsPanel
			label={ __( '矢印（ナビゲーション）', 'ystandard-toolbox' ) }
			panelId={ panelId }
			resetAll={ resetNavigation }
		>
			<ToolsPanelItem
				className="single-column"
				label={ __( '表示', 'ystandard-toolbox' ) }
				panelId={ panelId }
				hasValue={ () => !! attributes.hasNavigation }
				onDeselect={ resetNavigation }
				isShownByDefault
			>
				<HasNavigation { ...props } />
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
