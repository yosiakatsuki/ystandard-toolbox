/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';
/* Aktk Dependencies */
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import SpacingSizesControl from '@aktk/block-components/wp-controls/spacing-size-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';
import type { Spacing } from '@aktk/block-components/components/responsive-spacing-control';
import { normalizeSizeValue } from '@aktk/block-components/utils/size';
/* Block Dependencies */
import type { FaqItemEditProps } from '../../../types';
import { updateFaqItemElement } from '../../../style-utils';

const PANEL_ID = 'ystdtb-faq-item-label-spacing';

/**
 * ラベルの通常マージンと本文との間隔を編集・解除する。
 * @param props ブロック編集プロパティ。
 */
export function LabelSpacing( props: FaqItemEditProps ) {
	const { attributes, setAttributes } = props;
	const label = attributes.style?.ystdtb?.faqItem?.label;
	const item = attributes.style?.ystdtb?.faqItem?.item;
	const margin = label?.spacing?.margin;
	const gap = item?.spacing?.gap;
	// 同じパネル内の2項目を更新し、端末別値・文字・サイズ・本文余白を保持する。
	const update = ( nextMargin?: Spacing, nextGap?: string ) =>
		setAttributes( {
			style: updateFaqItemElement(
				updateFaqItemElement( attributes.style, 'label', {
					...label,
					spacing: { ...label?.spacing, margin: nextMargin },
				} ),
				'item',
				{ ...item, spacing: { ...item?.spacing, gap: nextGap } }
			),
		} );
	return (
		<ToolsPanel
			label={ __( 'FAQラベル（余白）', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ () => update() }
		>
			<ToolsPanelItem
				className="single-column"
				panelId={ PANEL_ID }
				label={ __( 'マージン', 'ystandard-toolbox' ) }
				isShownByDefault={ false }
				hasValue={ () =>
					Object.values( margin ?? {} ).some(
						( v ) => v !== undefined && v !== ''
					)
				}
				onDeselect={ () => update( undefined, gap ) }
			>
				<BaseControl
					id={ `${ PANEL_ID }-margin` }
					label={ __( 'マージン', 'ystandard-toolbox' ) }
				>
					<SpacingSizesControl
						values={ margin }
						onChange={ ( next ) => update( next, gap ) }
						sides={ [ 'top', 'bottom' ] }
						minimumCustomValue={ -9999 }
					/>
				</BaseControl>
			</ToolsPanelItem>
			<ToolsPanelItem
				className="single-column"
				panelId={ PANEL_ID }
				label={ __( 'ラベルと本文の間隔', 'ystandard-toolbox' ) }
				isShownByDefault={ false }
				hasValue={ () => gap !== undefined && gap !== '' }
				onDeselect={ () => update( margin, undefined ) }
			>
				<BaseControl>
					<UnitControl
						label={ __(
							'ラベルと本文の間隔',
							'ystandard-toolbox'
						) }
						value={ gap }
						onChange={ ( next ) =>
							update( margin, normalizeSizeValue( next ) )
						}
						min={ 0 }
						units={ [ 'px', 'em', 'rem' ].map( ( value ) => ( {
							value,
							label: value,
						} ) ) }
					/>
				</BaseControl>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
