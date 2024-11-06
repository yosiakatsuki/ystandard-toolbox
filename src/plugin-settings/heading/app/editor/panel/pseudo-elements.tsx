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
			return true;
			// @ts-ignore
			return names.some(
				( name ) => panelOptions?.hasOwnProperty( name )
			);
		},
		[]
	);

	const handleOnChange = ( newValue: { [ name: string ]: unknown } ) => {
		onChange( newValue );
	};

	return (
		<PluginSettingsPanel
			title={ panelName }
			initialOpen={ true }
			isNested={ true }
		>
			<EnablePseudoElements
				value={ option?.content }
				onChange={ onChange }
				type={ type }
			/>
			{ undefined !== option?.content && (
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
						</PanelInner>
					</PluginSettingsPanel>
					<PluginSettingsPanel
						title={ __( '背景設定', 'ystandard-toolbox' ) }
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
				</PanelGroup>
			) }
		</PluginSettingsPanel>
	);
}
