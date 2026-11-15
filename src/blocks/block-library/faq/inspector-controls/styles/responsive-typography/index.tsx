/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk dependencies.
 */
import { ResponsiveFontSizeControl } from '@aktk/block-components/components/responsive-font-size-control';
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';

/**
 * Plugin dependencies.
 */
import { PanelIcon } from '@aktk/components/ystandard-icon';

/**
 * Block dependencies.
 */
import type { FaqEditProps } from '../../../types';
import {
	getResponsiveTypography,
	updateResponsiveFontSize,
} from '../../../utils';

const PANEL_ID = 'ystdtb-faq-responsive-typography';

/**
 * FAQのレスポンシブタイポグラフィ設定.
 *
 * @param props ブロック編集プロパティ.
 * @return レスポンシブタイポグラフィパネル.
 */
export function ResponsiveTypography( props: FaqEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { fontSize } = getResponsiveTypography( attributes ) ?? {};

	// フォントサイズ設定をリセットする.
	const resetFontSize = () => {
		setAttributes( {
			style: updateResponsiveFontSize( attributes.style, undefined ),
		} );
	};

	return (
		<ToolsPanel
			icon={ <PanelIcon /> }
			label={ __( 'レスポンシブ文字設定', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ resetFontSize }
		>
			<ToolsPanelItem
				className="single-column"
				hasValue={ () =>
					Object.values( fontSize ?? {} ).some(
						( value ) => undefined !== value && '' !== value
					)
				}
				label={ __( 'フォントサイズ', 'ystandard-toolbox' ) }
				onDeselect={ resetFontSize }
				panelId={ PANEL_ID }
				isShownByDefault={ false }
			>
				<ResponsiveFontSizeControl
					id="ystdtb-faq-responsive-font-size"
					label={ __( 'フォントサイズ', 'ystandard-toolbox' ) }
					value={ fontSize }
					onChange={ ( value ) => {
						setAttributes( {
							style: updateResponsiveFontSize(
								attributes.style,
								value
							),
						} );
					} }
				/>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
