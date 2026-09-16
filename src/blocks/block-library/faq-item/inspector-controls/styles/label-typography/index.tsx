/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk dependencies.
 */
import {
	CustomFontSizePicker,
	type CustomFontSizePickerOnChangeProps,
} from '@aktk/block-components/components/custom-font-size-picker';
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';

/**
 * Block dependencies.
 */
import type { FaqItemEditProps } from '../../../types';

const PANEL_ID = 'ystdtb-faq-item-label-typography';

/**
 * FAQラベルの文字設定.
 *
 * @param props ブロック編集プロパティ.
 * @return FAQラベルの文字設定パネル.
 */
export function LabelTypography( props: FaqItemEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { labelSize, customLabelSize } = attributes;

	// ラベル文字サイズを更新する.
	const updateFontSize = ( newSize: CustomFontSizePickerOnChangeProps ) => {
		const { fontSize, customFontSize } = newSize;
		setAttributes( {
			labelSize: fontSize?.slug,
			customLabelSize: fontSize ? undefined : customFontSize,
		} );
	};

	// ラベル文字サイズだけをリセットする.
	const resetFontSize = () => {
		setAttributes( {
			labelSize: undefined,
			customLabelSize: undefined,
		} );
	};

	return (
		<ToolsPanel
			label={ __( 'FAQラベル（文字）', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ resetFontSize }
		>
			<ToolsPanelItem
				className="single-column"
				hasValue={ () => !! labelSize || !! customLabelSize }
				isShownByDefault
				label={ __( 'フォントサイズ', 'ystandard-toolbox' ) }
				onDeselect={ resetFontSize }
				panelId={ PANEL_ID }
			>
				<CustomFontSizePicker
					fontSize={ labelSize }
					customFontSize={ customLabelSize }
					onChange={ updateFontSize }
					useResponsive={ false }
				/>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
