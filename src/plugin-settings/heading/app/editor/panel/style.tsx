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
} from '@aktk/plugin-settings/heading/app/options/typography';

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
	return (
		<PanelGroup>
			<Preset />
			<OpenPanel title={ __( '文字設定', 'ystandard-toolbox' ) }>
				<PanelInner>
					<FontSize
						value={ headingOption?.style?.fontSize }
						onChange={ handleOnChange }
					/>
					<TextColor
						value={ headingOption?.style?.color }
						onChange={ handleOnChange }
					/>
					<TextAlign
						value={ headingOption?.style?.textAlign }
						onChange={ handleOnChange }
					/>
					<FontWeight
						value={ headingOption?.style?.fontWeight }
						onChange={ handleOnChange }
					/>
					<FontStyle
						value={ headingOption?.style?.fontStyle }
						onChange={ handleOnChange }
					/>
					<LineHeight
						value={ headingOption?.style?.lineHeight }
						onChange={ handleOnChange }
					/>
				</PanelInner>
			</OpenPanel>
		</PanelGroup>
	);
}
