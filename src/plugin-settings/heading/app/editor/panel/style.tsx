/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';

/**
 * Akatsuki
 */
import { OpenPanel } from '@aktk/block-components/components/panel';
/**
 * Plugin Dependencies
 */
import { PanelGroup, PanelInner } from './index';

/**
 * Options.
 */
import Preset from '../../options/preset';

/**
 * Context
 */
import { HeadingContext } from '../../index';
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

	return (
		<PanelGroup>
			<Preset />
			<OpenPanel title={ __( '文字設定', 'ystandard-toolbox' ) }>
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
			</OpenPanel>
			<OpenPanel title={ __( '背景設定', 'ystandard-toolbox' ) }>
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
			</OpenPanel>
			<OpenPanel title={ __( '枠線設定', 'ystandard-toolbox' ) }>
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
			</OpenPanel>
		</PanelGroup>
	);
}
