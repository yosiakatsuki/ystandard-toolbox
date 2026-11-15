/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';
/* Aktk Dependencies */
import {
	ResponsiveFontSizeControl,
	type ResponsiveFontSize,
} from '@aktk/block-components/components/responsive-font-size-control';
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';
/* Plugin Dependencies */
import { PanelIcon } from '@aktk/components/ystandard-icon';
/* Block Dependencies */
import type { FaqItemEditProps } from '../../../types';
import { updateFaqItemElement } from '../../../style-utils';

const PANEL_ID = 'ystdtb-faq-item-contents-responsive-typography';

/**
 * 本文の端末別文字サイズを、他の設定を保持して独立に編集する。
 * @param props ブロック編集プロパティ。
 */
export function ResponsiveTypography( props: FaqItemEditProps ) {
	const { attributes, setAttributes } = props;
	const contents = attributes.style?.ystdtb?.faqItem?.contents;
	const fontSize = contents?.responsive?.typography?.fontSize;
	// 本文の端末別文字サイズだけを変更し、通常文字サイズ・余白・ラベル設定を保持する。
	const update = ( next?: ResponsiveFontSize ) =>
		setAttributes( {
			style: updateFaqItemElement( attributes.style, 'contents', {
				...contents,
				responsive: {
					...contents?.responsive,
					typography: {
						...contents?.responsive?.typography,
						fontSize: next,
					},
				},
			} ),
		} );
	return (
		<ToolsPanel
			icon={ <PanelIcon /> }
			label={ __( 'レスポンシブ文字設定', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ () => update() }
		>
			<ToolsPanelItem
				className="single-column"
				panelId={ PANEL_ID }
				label={ __( 'フォントサイズ', 'ystandard-toolbox' ) }
				isShownByDefault={ false }
				hasValue={ () =>
					Object.values( fontSize ?? {} ).some(
						( v ) => v !== undefined && v !== ''
					)
				}
				onDeselect={ () => update() }
			>
				<ResponsiveFontSizeControl
					id={ `${ PANEL_ID }-font-size` }
					label={ __( 'フォントサイズ', 'ystandard-toolbox' ) }
					value={ fontSize }
					onChange={ update }
				/>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
