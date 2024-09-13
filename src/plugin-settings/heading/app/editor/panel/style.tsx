/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useContext, useCallback } from '@wordpress/element';

/**
 * Plugin Dependencies
 */
import { PanelGroup, PanelInner } from './index';
import { PluginSettingsPanel } from '@aktk/plugin-settings/components/panel';

/**
 * Options.
 */
import Preset from '../../options/preset';

/**
 * Context
 */
import { HeadingContext } from '../../index';
/**
 * Controls.
 */
import {
	FontSize,
	FontWeight,
	TextColor,
	TextAlign,
	FontStyle,
	LineHeight,
	LetterSpacing,
} from '@aktk/plugin-settings/heading/app/options/typography';
import {
	BackgroundColor,
	BackgroundImage,
	BackgroundPosition,
	BackgroundRepeat,
	BackgroundSize,
} from '@aktk/plugin-settings/heading/app/options/background';
import {
	Border,
	BorderRadius,
} from '@aktk/plugin-settings/heading/app/options/border';
import {
	Margin,
	Padding,
} from '@aktk/plugin-settings/heading/app/options/spacing';
import {
	Width,
	MaxWidth,
	MinWidth,
	Height,
	MaxHeight,
	MinHeight,
} from '@aktk/plugin-settings/heading/app/options/size';
import {
	AlignItems,
	Background,
	BoxShadow,
	FlexDirection,
	FontFamily,
	Gap,
	JustifyContent,
	ResponsiveDisplay,
	TextShadow,
} from '@aktk/plugin-settings/heading/app/options/advanced';
import type {
	HeadingOptions,
	HeadingStyle,
} from '@aktk/plugin-settings/heading/types';

export function StylePanel() {
	// @ts-ignore
	const { headingOption, setHeadingOption, setIsEdit } =
		useContext( HeadingContext );
	/**
	 * 設定反映
	 * @param newValue
	 * @param newValue.key
	 */
	const handleOnChange = ( newValue: { [ name: string ]: unknown } ) => {
		// @ts-ignore
		setHeadingOption( {
			...headingOption,
			style: {
				...headingOption?.style,
				...newValue,
			},
		} );
		setIsEdit( true );
	};

	const option = headingOption?.style;

	const isInitialOpen = useCallback(
		( panelOptions: HeadingStyle | undefined, names: string[] ) => {
			return names.some(
				( name ) => panelOptions?.hasOwnProperty( name )
			);
		},
		[]
	);

	return (
		<PanelGroup>
			<Preset />
			<PluginSettingsPanel
				title={ __( '文字設定', 'ystandard-toolbox' ) }
				initialOpen={ isInitialOpen( option, [
					'fontSize',
					'color',
					'textAlign',
					'fontWeight',
					'fontStyle',
					'lineHeight',
					'letterSpacing',
				] ) }
			>
				<PanelInner>
					<FontSize
						value={ option?.fontSize }
						onChange={ handleOnChange }
					/>
					<TextColor
						value={ option?.color }
						onChange={ handleOnChange }
					/>
					<TextAlign
						value={ option?.textAlign }
						onChange={ handleOnChange }
					/>
					<FontWeight
						value={ option?.fontWeight }
						onChange={ handleOnChange }
					/>
					<FontStyle
						value={ option?.fontStyle }
						onChange={ handleOnChange }
					/>
					<LineHeight
						value={ option?.lineHeight }
						onChange={ handleOnChange }
					/>
					<LetterSpacing
						value={ option?.letterSpacing }
						onChange={ handleOnChange }
					/>
				</PanelInner>
			</PluginSettingsPanel>
			<PluginSettingsPanel
				title={ __( '背景設定', 'ystandard-toolbox' ) }
				initialOpen={ isInitialOpen( option, [
					'backgroundColor',
					'backgroundImage',
				] ) }
			>
				<PanelInner>
					<BackgroundColor
						onChange={ handleOnChange }
						value={ option?.backgroundColor }
					/>
					<BackgroundImage
						onChange={ handleOnChange }
						value={ option?.backgroundImage }
					/>
					{ option?.backgroundImage && (
						<PanelInner>
							<BackgroundRepeat
								onChange={ handleOnChange }
								value={ option?.backgroundRepeat }
							/>
							<BackgroundPosition
								onChange={ handleOnChange }
								value={ option?.backgroundPosition }
							/>
							<BackgroundSize
								onChange={ handleOnChange }
								value={ option?.backgroundSize }
							/>
						</PanelInner>
					) }
				</PanelInner>
			</PluginSettingsPanel>
			<PluginSettingsPanel
				title={ __( '枠線設定', 'ystandard-toolbox' ) }
				initialOpen={ isInitialOpen( option, [
					'border',
					'borderRadius',
				] ) }
			>
				<PanelInner>
					<Border
						onChange={ handleOnChange }
						value={ option?.border }
					/>
					<BorderRadius
						onChange={ handleOnChange }
						value={ option?.borderRadius }
					/>
				</PanelInner>
			</PluginSettingsPanel>
			<PluginSettingsPanel
				title={ __( '余白設定', 'ystandard-toolbox' ) }
				initialOpen={ isInitialOpen( option, [ 'padding', 'margin' ] ) }
			>
				<PanelInner>
					<Padding
						value={ option?.padding }
						onChange={ handleOnChange }
					/>
					<Margin
						value={ option?.margin }
						onChange={ handleOnChange }
					/>
				</PanelInner>
			</PluginSettingsPanel>
			<PluginSettingsPanel
				title={ __( '幅・高さ設定', 'ystandard-toolbox' ) }
				initialOpen={ isInitialOpen( option, [
					'width',
					'maxWidth',
					'minWidth',
					'height',
					'maxHeight',
					'minHeight',
				] ) }
			>
				<PanelInner>
					<Width
						value={ option?.width }
						onChange={ handleOnChange }
					/>
					<MaxWidth
						value={ option?.maxWidth }
						onChange={ handleOnChange }
					/>
					<MinWidth
						value={ option?.minWidth }
						onChange={ handleOnChange }
					/>
					<Height
						value={ option?.height }
						onChange={ handleOnChange }
					/>
					<MaxHeight
						value={ option?.maxHeight }
						onChange={ handleOnChange }
					/>
					<MinHeight
						value={ option?.minHeight }
						onChange={ handleOnChange }
					/>
				</PanelInner>
			</PluginSettingsPanel>
			<PluginSettingsPanel
				title={ __( '上級者向け', 'ystandard-toolbox' ) }
				initialOpen={ isInitialOpen( option, [
					'display',
					'fontFamily',
					'background',
					'textShadow',
					'boxShadow',
				] ) }
			>
				<PanelInner>
					<ResponsiveDisplay
						value={ option?.display }
						onChange={ handleOnChange }
					/>
					<FlexDirection
						value={ option?.flexDirection }
						onChange={ handleOnChange }
						displayValue={ option?.display }
					/>
					<AlignItems
						value={ option?.alignItems }
						onChange={ handleOnChange }
						displayValue={ option?.display }
					/>
					<JustifyContent
						value={ option?.justifyContent }
						onChange={ handleOnChange }
						displayValue={ option?.display }
					/>
					<Gap
						value={ option?.gap }
						onChange={ handleOnChange }
						displayValue={ option?.display }
					/>
					<FontFamily
						value={ option?.fontFamily }
						onChange={ handleOnChange }
					/>
					<Background
						value={ option?.background }
						onChange={ handleOnChange }
					/>
					<TextShadow
						value={ option?.textShadow }
						onChange={ handleOnChange }
					/>
					<BoxShadow
						value={ option?.boxShadow }
						onChange={ handleOnChange }
					/>
				</PanelInner>
			</PluginSettingsPanel>
		</PanelGroup>
	);
}
