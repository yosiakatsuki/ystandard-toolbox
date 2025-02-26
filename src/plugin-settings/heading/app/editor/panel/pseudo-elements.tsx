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
 * Context
 */
import { HeadingContext } from '../../index';
import type { HeadingPseudoElementsStyle } from '@aktk/plugin-settings/heading/types';

/**
 * Controls.
 */
import {
	EnablePseudoElements,
	PseudoElementsContent,
	PseudoElementsIcon,
	IconColor,
} from '@aktk/plugin-settings/heading/app/options/pseudo-elements';
import {
	FontSize,
	FontStyle,
	FontWeight,
	LetterSpacing,
	LineHeight,
	TextColor,
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
	Height,
	MaxHeight,
	MaxWidth,
	MinHeight,
	MinWidth,
	Width,
} from '@aktk/plugin-settings/heading/app/options/size';
import {
	Background,
	BoxShadow,
	FontFamily,
	ResponsiveDisplay,
	TextShadow,
	Position,
	PositionTop,
	PositionRight,
	PositionBottom,
	PositionLeft,
} from '@aktk/plugin-settings/heading/app/options/advanced';

/**
 * BeforePanel
 */
export function BeforePanel() {
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
			before: {
				...headingOption?.before,
				...newValue,
			},
		} );
		setIsEdit( true );
	};

	const option = headingOption?.before;

	return (
		<PseudoElements
			panelName={ __( '::before設定', 'ystandard-toolbox' ) }
			option={ option }
			onChange={ handleOnChange }
			type={ 'before' }
		/>
	);
}

/**
 * AfterPanel
 */
export function AfterPanel() {
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
			after: {
				...headingOption?.after,
				...newValue,
			},
		} );
		setIsEdit( true );
	};

	const option = headingOption?.after;

	return (
		<PseudoElements
			panelName={ __( '::after設定', 'ystandard-toolbox' ) }
			option={ option }
			onChange={ handleOnChange }
			type={ 'after' }
		/>
	);
}

interface PseudoElementsProps {
	panelName: string;
	option: HeadingPseudoElementsStyle | undefined;
	onChange: ( newValue: { [ name: string ]: unknown } ) => void;
	type: 'before' | 'after';
}

/**
 * PseudoElements
 * @param props {PseudoElementsProps} - props
 */
function PseudoElements( props: PseudoElementsProps ) {
	const { panelName, option, onChange, type } = props;

	const isInitialOpen = useCallback(
		(
			panelOptions: HeadingPseudoElementsStyle | undefined,
			names: string[]
		) => {
			return names.some(
				( name ) =>
					panelOptions?.hasOwnProperty( name ) &&
					// @ts-ignore
					!! panelOptions[ name ]
			);
		},
		[ option?.icon ]
	);

	const handleOnChange = ( newValue: { [ name: string ]: unknown } ) => {
		onChange( newValue );
	};

	// アイコン設定があったら無効化する.
	const DisableHasIcon = useCallback(
		( { children }: { children: React.ReactNode } ) => {
			if ( option?.icon ) {
				return <></>;
			}
			return <>{ children }</>;
		},
		[ option?.icon ]
	);

	return (
		<PluginSettingsPanel
			title={ panelName }
			initialOpen={ isInitialOpen( option || {}, [
				'enable',
				'content',
			] ) }
			isNested={ true }
		>
			<EnablePseudoElements
				value={ option?.enable }
				onChange={ onChange }
				type={ type }
			/>
			{ option?.enable && (
				<PanelGroup>
					<PluginSettingsPanel
						title={ 'content' }
						initialOpen={ isInitialOpen(
							{
								content: option?.content,
							},
							[ 'content' ]
						) }
					>
						<PseudoElementsContent
							value={ option?.content }
							onChange={ handleOnChange }
							type={ type }
							hasIcon={ !! option?.icon }
						/>
					</PluginSettingsPanel>
					<PluginSettingsPanel
						title={ __( 'アイコン', 'ystandard-toolbox' ) }
						initialOpen={ isInitialOpen(
							{
								icon: option?.icon,
							},
							[ 'icon' ]
						) }
					>
						<PseudoElementsIcon
							value={ option?.icon }
							onChange={ handleOnChange }
							type={ type }
							hasContent={ !! option?.content && ! option?.icon }
						/>
						{ option?.icon && (
							<IconColor
								value={ option?.iconColor }
								onChange={ handleOnChange }
							/>
						) }
					</PluginSettingsPanel>
					<PluginSettingsPanel
						title={ __( '文字設定', 'ystandard-toolbox' ) }
						initialOpen={ isInitialOpen( option || {}, [
							'fontSize',
							'color',
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
							<DisableHasIcon>
								<TextColor
									value={ option?.color }
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
							</DisableHasIcon>
						</PanelInner>
					</PluginSettingsPanel>
					<DisableHasIcon>
						<PluginSettingsPanel
							title={ __( '背景設定', 'ystandard-toolbox' ) }
							initialOpen={ isInitialOpen( option || {}, [
								'backgroundColor',
								'backgroundImage',
								'backgroundRepeat',
								'backgroundPosition',
								'backgroundSize',
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
							initialOpen={ isInitialOpen( option || {}, [
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
					</DisableHasIcon>
					<PluginSettingsPanel
						title={ __( '余白設定', 'ystandard-toolbox' ) }
						initialOpen={ isInitialOpen( option, [
							'padding',
							'margin',
						] ) }
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
					<DisableHasIcon>
						<PluginSettingsPanel
							title={ __( '幅・高さ設定', 'ystandard-toolbox' ) }
							initialOpen={ isInitialOpen( option, [
								'width',
								'height',
								'maxWidth',
								'maxHeight',
								'minWidth',
								'minHeight',
							] ) }
						>
							<PanelInner>
								<Width
									value={ option?.width }
									onChange={ handleOnChange }
								/>
								<Height
									value={ option?.height }
									onChange={ handleOnChange }
								/>
								<MaxWidth
									value={ option?.maxWidth }
									onChange={ handleOnChange }
								/>
								<MaxHeight
									value={ option?.maxHeight }
									onChange={ handleOnChange }
								/>
								<MinWidth
									value={ option?.minWidth }
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
								'position',
							] ) }
						>
							<PanelInner>
								<ResponsiveDisplay
									value={ option?.display }
									onChange={ handleOnChange }
								/>
								<Position
									value={ option?.position }
									onChange={ handleOnChange }
								/>
								<PositionTop
									value={ option?.top }
									onChange={ handleOnChange }
									position={ option?.position }
								/>
								<PositionRight
									value={ option?.right }
									onChange={ handleOnChange }
									position={ option?.position }
								/>
								<PositionBottom
									value={ option?.bottom }
									onChange={ handleOnChange }
									position={ option?.position }
								/>
								<PositionLeft
									value={ option?.left }
									onChange={ handleOnChange }
									position={ option?.position }
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
					</DisableHasIcon>
				</PanelGroup>
			) }
		</PluginSettingsPanel>
	);
}
