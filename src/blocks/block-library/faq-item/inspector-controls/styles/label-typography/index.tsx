/**
 * WordPress dependencies.
 */
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Aktk dependencies.
 */
import {
	CustomFontSizePicker,
	type CustomFontSizePickerOnChangeProps,
} from '@aktk/block-components/components/custom-font-size-picker';
import useThemeColors from '@aktk/block-components/hooks/useThemeColors';
import ColorGradientSettingsDropdown from '@aktk/block-components/wp-controls/color-gradient-settings-dropdown';
import { FontAppearanceControl } from '@aktk/block-components/wp-controls/font-appearance-control';
import {
	ToolsPanel,
	ToolsPanelItem,
} from '@aktk/block-components/wp-controls/tools-panel';

/**
 * Block dependencies.
 */
import type { FaqItemEditProps } from '../../../types';
import {
	getLabelTextColor,
	getLabelTypography,
	updateLabelTextColor,
	updateLabelTypography,
} from '../../../utils';

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
	const typography = getLabelTypography( attributes );
	const textColor = getLabelTextColor( attributes );
	const colors = useThemeColors();
	const allColors = useMemo(
		() => colors.flatMap( ( palette ) => palette.colors ),
		[ colors ]
	);
	const presetPrefix = 'var:preset|color|';
	const presetSlug = textColor?.startsWith( presetPrefix )
		? textColor.slice( presetPrefix.length )
		: undefined;
	const colorValue =
		allColors.find( ( color ) => color.slug === presetSlug )?.color ??
		textColor;

	// ラベル文字色を更新する.
	const updateTextColor = ( newColor?: string, selectedSlug?: string ) => {
		const slug =
			selectedSlug ??
			allColors.find( ( color ) => color.color === newColor )?.slug;
		setAttributes( {
			style: updateLabelTextColor(
				attributes.style,
				slug ? `${ presetPrefix }${ slug }` : newColor
			),
		} );
	};

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

	// ラベルの外観を更新する.
	const updateAppearance = ( appearance: {
		fontStyle?: string;
		fontWeight?: string;
	} ) => {
		setAttributes( {
			style: updateLabelTypography( attributes.style, {
				...typography,
				...appearance,
			} ),
		} );
	};

	// ラベルの外観だけをリセットする.
	const resetAppearance = () => {
		setAttributes( {
			style: updateLabelTypography( attributes.style, undefined ),
		} );
	};

	// ラベルの文字設定をすべてリセットする.
	const resetAll = () => {
		const styleWithoutTypography = updateLabelTypography(
			attributes.style,
			undefined
		);
		setAttributes( {
			labelSize: undefined,
			customLabelSize: undefined,
			style: updateLabelTextColor( styleWithoutTypography, undefined ),
		} );
	};

	return (
		<ToolsPanel
			label={ __( 'FAQラベル（文字）', 'ystandard-toolbox' ) }
			panelId={ PANEL_ID }
			resetAll={ resetAll }
		>
			<ColorGradientSettingsDropdown
				panelId={ PANEL_ID }
				colors={ colors }
				gradients={ [] }
				disableCustomGradients
				__experimentalIsRenderedInSidebar
				settings={ [
					{
						label: __( '色', 'ystandard-toolbox' ),
						colorValue,
						onColorChange: updateTextColor,
						onGradientChange: () => undefined,
						clearable: true,
						gradients: [],
						disableCustomGradients: true,
						isShownByDefault: true,
					},
				] }
			/>
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
			<ToolsPanelItem
				className="single-column"
				hasValue={ () =>
					!! typography?.fontStyle || !! typography?.fontWeight
				}
				isShownByDefault={ false }
				label={ __( '外観', 'ystandard-toolbox' ) }
				onDeselect={ resetAppearance }
				panelId={ PANEL_ID }
			>
				<FontAppearanceControl
					value={ {
						fontStyle: typography?.fontStyle,
						fontWeight: typography?.fontWeight,
					} }
					onChange={ updateAppearance }
					hasFontStyles
					hasFontWeights
				/>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
