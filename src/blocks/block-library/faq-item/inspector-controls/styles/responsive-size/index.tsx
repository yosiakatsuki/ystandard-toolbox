/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';
/* Aktk Dependencies */
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';
import type { ResponsiveFontSize } from '@aktk/block-components/components/responsive-font-size-control';
/* Plugin Dependencies */
import { PanelIcon } from '@aktk/components/ystandard-icon';
/* Block Dependencies */
import type { FaqItemEditProps } from '../../../types';
import { updateFaqItemElement } from '../../../style-utils';
import { ResponsiveLengthControl } from '../components/responsive-length-control';

const PANEL_ID = 'ystdtb-faq-item-responsive-size';

/**
 * 通常サイズを保持して、ラベルの端末別寸法だけを編集・解除する。
 * @param props ブロック編集プロパティ。
 */
export function ResponsiveSize( props: FaqItemEditProps ) {
	const { attributes, setAttributes } = props;
	const label = attributes.style?.ystdtb?.faqItem?.label;
	const size = label?.responsive?.dimensions?.size;
	// 端末別の寸法以外を保持する。
	const update = ( next?: ResponsiveFontSize ) =>
		setAttributes( {
			style: updateFaqItemElement( attributes.style, 'label', {
				...label,
				responsive: {
					...label?.responsive,
					dimensions: {
						...label?.responsive?.dimensions,
						size: next,
					},
				},
			} ),
		} );
	return (
		<ToolsPanel
			icon={ <PanelIcon /> }
			label={ __( 'レスポンシブサイズ', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ () => update() }
		>
			<ToolsPanelItem
				className="single-column"
				panelId={ PANEL_ID }
				label={ __( 'ラベルサイズ', 'ystandard-toolbox' ) }
				isShownByDefault={ false }
				hasValue={ () =>
					Object.values( size ?? {} ).some(
						( v ) => v !== undefined && v !== ''
					)
				}
				onDeselect={ () => update() }
			>
				<ResponsiveLengthControl
					label={ __( 'ラベルサイズ', 'ystandard-toolbox' ) }
					value={ size }
					onChange={ update }
				/>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
