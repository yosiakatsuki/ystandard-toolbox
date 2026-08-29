/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';

/**
 * Block Dependencies.
 */
import type { FaqEditProps } from '../../../types';

const PANEL_ID = 'ystdtb-faq-accordion-arrow';

/**
 * 開閉ボタンの色設定.
 *
 * @param props ブロック編集プロパティ.
 * @return 開閉ボタンの色パネル.
 */
export function AccordionArrowColor( props: FaqEditProps ): JSX.Element | null {
	const { attributes, setAttributes, updateChildAttributes } = props;
	const { isAccordion, accordionArrowColor, customAccordionArrowColor } =
		attributes;

	// 親子の開閉ボタン色を同じ値に更新する.
	const handleOnChange = ( newColor?: string, slug?: string ) => {
		setAttributes( {
			accordionArrowColor: slug,
			customAccordionArrowColor: slug ? undefined : newColor,
		} );
		updateChildAttributes( {
			accordionArrowColor: slug,
			customAccordionArrowColor: slug ? undefined : newColor,
		} );
	};

	// 開閉ボタン色を親子からまとめて削除する.
	const resetColor = () => {
		handleOnChange( undefined, undefined );
	};

	// 開閉ボタンがない通常表示では不要な設定を表示しない.
	if ( ! isAccordion ) {
		return null;
	}

	return (
		<ToolsPanel
			label={ __( '開閉ボタン', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ resetColor }
		>
			<ToolsPanelItem
				className="single-column"
				hasValue={ () =>
					!! ( accordionArrowColor || customAccordionArrowColor )
				}
				isShownByDefault={ false }
				label={ __( '色', 'ystandard-toolbox' ) }
				onDeselect={ resetColor }
				panelId={ PANEL_ID }
			>
				<BaseControl
					id="faq-accordion-arrow-color"
					label={ __( '色', 'ystandard-toolbox' ) }
				>
					<ColorPalette
						label={ __( '色', 'ystandard-toolbox' ) }
						value={ customAccordionArrowColor || '' }
						slug={ accordionArrowColor }
						onChange={ handleOnChange }
					/>
				</BaseControl>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
