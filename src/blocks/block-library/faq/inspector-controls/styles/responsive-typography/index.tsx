/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk dependencies.
 */
import { ResponsiveFontSizeControl } from '@aktk/block-components/components/responsive-font-size-control';
import {
	hasResponsiveTextAlignValue,
	ResponsiveTextAlignControl,
} from '@aktk/block-components/components/responsive-text-align-control';
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';

/**
 * Block dependencies.
 */
import type { FaqEditProps } from '../../../types';
import {
	getResponsiveTypography,
	updateResponsiveFontSize,
	updateResponsiveTextAlign,
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
	const { fontSize, textAlign } = getResponsiveTypography( attributes ) ?? {};

	// フォントサイズ設定をリセットする.
	const resetFontSize = () => {
		setAttributes( {
			style: updateResponsiveFontSize( attributes.style, undefined ),
		} );
	};

	// 文字揃え設定をリセットする.
	const resetTextAlign = () => {
		setAttributes( {
			style: updateResponsiveTextAlign( attributes.style, undefined ),
		} );
	};

	// レスポンシブタイポグラフィ設定をまとめてリセットする.
	const resetAll = () => {
		const styleWithoutFontSize = updateResponsiveFontSize(
			attributes.style,
			undefined
		);
		setAttributes( {
			style: updateResponsiveTextAlign( styleWithoutFontSize, undefined ),
		} );
	};

	return (
		<ToolsPanel
			label={ __( 'レスポンシブ文字設定', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ resetAll }
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
			<ToolsPanelItem
				className="single-column"
				hasValue={ () => hasResponsiveTextAlignValue( textAlign ) }
				label={ __( '文字揃え', 'ystandard-toolbox' ) }
				onDeselect={ resetTextAlign }
				panelId={ PANEL_ID }
				isShownByDefault={ false }
			>
				<ResponsiveTextAlignControl
					id="ystdtb-faq-responsive-text-align"
					label={ __( '文字揃え', 'ystandard-toolbox' ) }
					value={ textAlign }
					onChange={ ( value ) => {
						setAttributes( {
							style: updateResponsiveTextAlign(
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
