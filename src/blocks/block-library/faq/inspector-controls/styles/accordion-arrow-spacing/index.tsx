/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk dependencies.
 */
import type { Spacing } from '@aktk/block-components/components/custom-spacing-select';
import SpacingSizesControl from '@aktk/block-components/wp-controls/spacing-size-control';
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';

/**
 * Block dependencies.
 */
import type { FaqItemBlockAttributes } from '@aktk/blocks/block-library/faq-item/types';
import { updateAccordionArrowMargin as updateItemAccordionArrowMargin } from '@aktk/blocks/block-library/faq-item/utils';
import type { FaqEditProps } from '../../../types';
import {
	getAccordionArrowMargin,
	updateAccordionArrowMargin,
} from '../../../utils';

const PANEL_ID = 'ystdtb-faq-accordion-arrow-spacing';
const MARGIN_SIDES: ( 'top' | 'right' | 'bottom' | 'left' )[] = [
	'top',
	'right',
	'bottom',
	'left',
];

/**
 * margin設定があるかチェック.
 *
 * @param margin margin設定.
 * @return 設定がある場合はtrue.
 */
function hasMargin( margin?: Spacing ) {
	return Object.values( margin ?? {} ).some(
		( value ) => undefined !== value && '' !== value
	);
}

/**
 * 開閉ボタンの余白設定.
 *
 * @param props ブロック編集プロパティ.
 * @return 開閉ボタンの余白パネル.
 */
export function AccordionArrowSpacing( props: FaqEditProps ) {
	const { attributes, setAttributes, updateChildAttributes } = props;
	const { isAccordion } = attributes;

	// 開閉ボタンがない通常表示では不要な設定を表示しない.
	if ( ! isAccordion ) {
		return null;
	}

	const margin = getAccordionArrowMargin( attributes );

	// 親子の開閉ボタンmarginを同じ値に更新する.
	const updateMargin = ( newMargin?: Spacing ) => {
		setAttributes( {
			style: updateAccordionArrowMargin( attributes.style, newMargin ),
		} );
		updateChildAttributes( ( childAttributes ) => {
			const itemAttributes = childAttributes as FaqItemBlockAttributes;
			return {
				style: updateItemAccordionArrowMargin(
					itemAttributes.style,
					newMargin
				),
			};
		} );
	};

	// 開閉ボタンmarginを親子からまとめて削除する.
	const resetMargin = () => {
		updateMargin( undefined );
	};

	return (
		<ToolsPanel
			label={ __( '開閉ボタン（余白）', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ resetMargin }
		>
			<ToolsPanelItem
				className="single-column"
				hasValue={ () => hasMargin( margin ) }
				isShownByDefault={ false }
				label={ __( 'マージン', 'ystandard-toolbox' ) }
				onDeselect={ resetMargin }
				panelId={ PANEL_ID }
			>
				<SpacingSizesControl
					label={ __( 'マージン', 'ystandard-toolbox' ) }
					values={ margin }
					onChange={ updateMargin }
					sides={ MARGIN_SIDES }
					minimumCustomValue={ -9999 }
				/>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
