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
	type ResponsiveSpacing,
} from '@aktk/block-components/components/responsive-spacing-control';
import type { ResponsiveFontSize } from '@aktk/block-components/components/responsive-font-size-control';
/* Plugin Dependencies */
import { PanelIcon } from '@aktk/components/ystandard-icon';
/* Block Dependencies */
import type { FaqItemEditProps } from '../../../types';
import { updateFaqItemElement } from '../../../style-utils';
import { ResponsiveLengthControl } from '../components/responsive-length-control';

const PANEL_ID = 'ystdtb-faq-item-responsive-label-spacing';

/**
 * ラベルの端末別マージンと本文との間隔を編集・解除する。
 * @param props ブロック編集プロパティ。
 */
export function ResponsiveLabelSpacing( props: FaqItemEditProps ) {
	const { attributes, setAttributes } = props;
	const label = attributes.style?.ystdtb?.faqItem?.label;
	const item = attributes.style?.ystdtb?.faqItem?.item;
	const margin = label?.responsive?.spacing?.margin;
	const gap = item?.responsive?.spacing?.gap;
	// 同じパネル内の2項目を更新し、通常値・文字・サイズ・本文余白を保持する。
	const update = (
		nextMargin?: ResponsiveSpacing,
		nextGap?: ResponsiveFontSize
	) =>
		setAttributes( {
			style: updateFaqItemElement(
				updateFaqItemElement( attributes.style, 'label', {
					...label,
					responsive: {
						...label?.responsive,
						spacing: {
							...label?.responsive?.spacing,
							margin: nextMargin,
						},
					},
				} ),
				'item',
				{
					...item,
					responsive: {
						...item?.responsive,
						spacing: { ...item?.responsive?.spacing, gap: nextGap },
					},
				}
			),
		} );
	return (
		<ToolsPanel
			icon={ <PanelIcon /> }
			label={ __( 'レスポンシブラベル余白', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ () => update() }
		>
			<ToolsPanelItem
				className="single-column"
				panelId={ PANEL_ID }
				label={ __( 'マージン', 'ystandard-toolbox' ) }
				isShownByDefault={ false }
				hasValue={ () => hasResponsiveSpacingValue( margin ) }
				onDeselect={ () => update( undefined, gap ) }
			>
				<ResponsiveSpacingControl
					id={ `${ PANEL_ID }-margin` }
					label={ __( 'マージン', 'ystandard-toolbox' ) }
					value={ margin }
					onChange={ ( next ) => update( next, gap ) }
					allowedSides={ [ 'top', 'bottom' ] }
					minimumCustomValue={ -9999 }
				/>
			</ToolsPanelItem>
			<ToolsPanelItem
				className="single-column"
				panelId={ PANEL_ID }
				label={ __( 'ラベルと本文の間隔', 'ystandard-toolbox' ) }
				isShownByDefault={ false }
				hasValue={ () =>
					Object.values( gap ?? {} ).some(
						( v ) => v !== undefined && v !== ''
					)
				}
				onDeselect={ () => update( margin, undefined ) }
			>
				<ResponsiveLengthControl
					label={ __( 'ラベルと本文の間隔', 'ystandard-toolbox' ) }
					value={ gap }
					onChange={ ( next ) => update( margin, next ) }
				/>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
