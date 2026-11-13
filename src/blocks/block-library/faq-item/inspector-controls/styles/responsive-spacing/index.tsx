/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';
/* Aktk Dependencies */
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';
import {
	ResponsiveSpacingControl,
	hasResponsiveSpacingValue,
	type ResponsiveSpacing as ResponsiveSpacingValue,
} from '@aktk/block-components/components/responsive-spacing-control';
/* Plugin Dependencies */
import { PanelIcon } from '@aktk/components/ystandard-icon';
/* Block Dependencies */
import type { FaqItemEditProps } from '../../../types';
import { updateFaqItemElement } from '../../../style-utils';

const PANEL_ID = 'ystdtb-faq-item-responsive-spacing';

/**
 * 本文領域の端末別パディングだけを編集・解除する。
 * @param props ブロック編集プロパティ。
 */
export function ResponsiveSpacing( props: FaqItemEditProps ) {
	const { attributes, setAttributes } = props;
	const contents = attributes.style?.ystdtb?.faqItem?.contents;
	const padding = contents?.responsive?.spacing?.padding;
	// 通常値と本文文字設定を保持する。
	const update = ( next?: ResponsiveSpacingValue ) =>
		setAttributes( {
			style: updateFaqItemElement( attributes.style, 'contents', {
				...contents,
				responsive: {
					...contents?.responsive,
					spacing: {
						...contents?.responsive?.spacing,
						padding: next,
					},
				},
			} ),
		} );
	return (
		<ToolsPanel
			icon={ <PanelIcon /> }
			label={ __( 'レスポンシブ余白', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ () => update() }
		>
			<ToolsPanelItem
				className="single-column"
				panelId={ PANEL_ID }
				label={ __( 'パディング', 'ystandard-toolbox' ) }
				isShownByDefault={ false }
				hasValue={ () => hasResponsiveSpacingValue( padding ) }
				onDeselect={ () => update() }
			>
				<ResponsiveSpacingControl
					id={ `${ PANEL_ID }-padding` }
					label={ __( 'パディング', 'ystandard-toolbox' ) }
					value={ padding }
					onChange={ update }
					allowedSides={ [ 'top', 'right', 'bottom', 'left' ] }
				/>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
