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
 * Block dependencies
 */
import { Accordion } from './accordion';
import type { FaqEditProps } from '../../types';

const PANEL_ID = 'ystdtb-faq-settings';

/**
 * FAQの表示方式を設定するパネル.
 *
 * @param props ブロック編集プロパティ.
 */
export function FaqOption( props: FaqEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;

	// 開閉式を解除し、標準の通常表示に戻す.
	const resetAccordion = () => {
		setAttributes( { isAccordion: false } );
	};

	return (
		<ToolsPanel
			label={ __( 'FAQ設定', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ resetAccordion }
		>
			<ToolsPanelItem
				className="single-column"
				label={ __( '開閉式', 'ystandard-toolbox' ) }
				panelId={ PANEL_ID }
				hasValue={ () => attributes.isAccordion }
				onDeselect={ resetAccordion }
				isShownByDefault
			>
				<Accordion { ...props } />
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
