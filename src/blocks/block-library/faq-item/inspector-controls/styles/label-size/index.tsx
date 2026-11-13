/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';
/* Aktk Dependencies */
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';
/* Block Dependencies */
import type { FaqItemEditProps } from '../../../types';
import { updateFaqItemElement } from '../../../style-utils';
import { LabelSize } from './size-control';

const PANEL_ID = 'ystdtb-faq-item-label-size';

/**
 * ラベルの通常サイズを必要な場合だけ追加する。
 * @param props ブロック編集プロパティ。
 */
export function LabelSizePanel( props: FaqItemEditProps ) {
	const { attributes, setAttributes } = props;
	const label = attributes.style?.ystdtb?.faqItem?.label;
	// 通常のサイズだけを解除し、端末別の寸法や他パネルの値を保持する。
	const reset = () =>
		setAttributes( {
			style: updateFaqItemElement( attributes.style, 'label', {
				...label,
				dimensions: { ...label?.dimensions, size: undefined },
			} ),
		} );
	return (
		<ToolsPanel
			label={ __( 'FAQラベル（サイズ）', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ reset }
		>
			<ToolsPanelItem
				className="single-column"
				panelId={ PANEL_ID }
				label={ __( 'ラベルサイズ', 'ystandard-toolbox' ) }
				isShownByDefault={ false }
				hasValue={ () =>
					label?.dimensions?.size !== undefined &&
					label.dimensions.size !== ''
				}
				onDeselect={ reset }
			>
				<LabelSize { ...props } />
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
