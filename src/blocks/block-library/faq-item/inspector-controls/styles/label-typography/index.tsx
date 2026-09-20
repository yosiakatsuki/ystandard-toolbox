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
import { useFontFamilies } from '@aktk/block-components/components/font-family-select';
import useThemeColors from '@aktk/block-components/hooks/useThemeColors';
import ColorGradientSettingsDropdown from '@aktk/block-components/wp-controls/color-gradient-settings-dropdown';
import { FontAppearanceControl } from '@aktk/block-components/wp-controls/font-appearance-control';
import FontFamilyControl from '@aktk/block-components/wp-controls/font-family-control';
import LineHeightControl from '@aktk/block-components/wp-controls/line-height-control';
import TextTransformControl from '@aktk/block-components/wp-controls/text-transform-control';
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
const FONT_FAMILY_PRESET_PREFIX = 'var:preset|font-family|';

type FontFamilyPreset = {
	name: string;
	slug?: string;
	fontFamily: string;
};

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
	const fontFamilies = useFontFamilies() as FontFamilyPreset[];
	const fontFamilySlug = typography?.fontFamily?.startsWith(
		FONT_FAMILY_PRESET_PREFIX
	)
		? typography.fontFamily.slice( FONT_FAMILY_PRESET_PREFIX.length )
		: undefined;
	const fontFamilyValue =
		fontFamilies.find( ( family ) => family.slug === fontFamilySlug )
			?.fontFamily ?? typography?.fontFamily;
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

	// ラベルの文字設定を1項目だけ更新する.
	const updateTypographyValue = (
		property: 'fontFamily' | 'lineHeight' | 'textTransform',
		value?: string
	) => {
		setAttributes( {
			style: updateLabelTypography( attributes.style, {
				...typography,
				[ property ]: value || undefined,
			} ),
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
			style: updateLabelTypography( attributes.style, {
				...typography,
				fontStyle: undefined,
				fontWeight: undefined,
			} ),
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
				hasValue={ () => !! typography?.fontFamily }
				isShownByDefault={ false }
				label={ __( 'フォント', 'ystandard-toolbox' ) }
				onDeselect={ () =>
					updateTypographyValue( 'fontFamily', undefined )
				}
				panelId={ PANEL_ID }
			>
				<FontFamilyControl
					fontFamilies={ fontFamilies }
					value={ fontFamilyValue }
					onChange={ ( newValue ) => {
						const preset = fontFamilies.find(
							( family ) => family.fontFamily === newValue
						);
						updateTypographyValue(
							'fontFamily',
							preset?.slug
								? `${ FONT_FAMILY_PRESET_PREFIX }${ preset.slug }`
								: newValue
						);
					} }
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
			<ToolsPanelItem
				className="single-column"
				hasValue={ () => !! typography?.lineHeight }
				isShownByDefault={ false }
				label={ __( '行の高さ', 'ystandard-toolbox' ) }
				onDeselect={ () =>
					updateTypographyValue( 'lineHeight', undefined )
				}
				panelId={ PANEL_ID }
			>
				<LineHeightControl
					value={ typography?.lineHeight }
					onChange={ ( newValue ) =>
						updateTypographyValue( 'lineHeight', newValue )
					}
				/>
			</ToolsPanelItem>
			<ToolsPanelItem
				className="single-column"
				hasValue={ () => !! typography?.textTransform }
				isShownByDefault={ false }
				label={ __( '大文字小文字', 'ystandard-toolbox' ) }
				onDeselect={ () =>
					updateTypographyValue( 'textTransform', undefined )
				}
				panelId={ PANEL_ID }
			>
				<TextTransformControl
					value={ typography?.textTransform }
					onChange={ ( newValue ) =>
						updateTypographyValue( 'textTransform', newValue )
					}
				/>
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
