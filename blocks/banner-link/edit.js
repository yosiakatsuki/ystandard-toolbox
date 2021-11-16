import classnames from 'classnames';
import {
	RichText,
	withColors,
	useBlockProps,
	__experimentalUseGradient,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { blockClassName, blockClasses } from "./config";
import { BannerLinkInspectorControls as InspectorControls } from './inspector-controls';
import { BannerLinkBlockControls as BlockControls } from './block-controls';
import { getBoxShadowStyle } from "@ystdtb/components/box-shadow-control";
import {
	getBackgroundImage,
	getBackgroundPosition, getContentPositionStyle,
	getCustomProperty,
	getFontSizeStyle,
	getOverlayBackGround, getPaddingStyle, isClearStyle
} from "./function/style";
import { getRatioClassName, getRatioInnerClassName } from "@ystdtb/helper/ratio";
import { getBorderColorClass, getBorderStyle } from "@ystdtb/components/border-control";
import { getFontSizeClassByObject } from "@ystdtb/helper/fontSize";
import { getComponentConfig } from "@ystdtb/helper/config";
import { getResponsiveCustomProperties } from "@ystdtb/helper/responsive";

const BannerLink = ( props ) => {

	const {
		attributes,
		setAttributes,
		backgroundColor,
		mainTextColor,
		subTextColor,
	} = props;

	const {
		className,
		backgroundImage,
		backgroundImageFocalPoint,
		backgroundOpacity,
		ratio,
		size,
		borderRadius,
		border,
		mainText,
		mainTextFontSize,
		mainTextLineHeight,
		mainTextLetterSpacing,
		mainTextHtml,
		mainTextStyleClear,
		subText,
		subTextFontSize,
		subTextLineHeight,
		subTextLetterSpacing,
		subTextHtml,
		subTextStyleClear,
		subTextMargin,
		boxShadow,
		padding,
		contentPosition,
	} = attributes;

	const { gradientClass, gradientValue } =
		__experimentalUseGradient();
	const clearStyle = getComponentConfig( 'headingClearStyle' );

	const fontSizeClasses = {
		mainText: getFontSizeClassByObject( mainTextFontSize?.desktop ),
		subText: getFontSizeClassByObject( subTextFontSize?.desktop ),
	};

	const wrapProps = useBlockProps( {} );
	wrapProps.className = wrapProps.className.replace( className, '' );

	/**
	 * Block
	 */
	const blockProps = {
		className: classnames(
			blockClassName,
			getRatioClassName( ratio ),
			{}
		),
		style: {
			backgroundImage: getBackgroundImage( backgroundImage ),
			backgroundPosition: getBackgroundPosition( backgroundImageFocalPoint ),
			...getBoxShadowStyle( boxShadow ),
			...getCustomProperty( 'max-width', size?.maxWidth ),
			...getCustomProperty( 'min-height', size?.minHeight ),
			borderRadius: borderRadius || undefined,
		}
	};

	/**
	 * Container
	 */
	const containerProps = {
		className: classnames(
			blockClasses.container,
			getRatioInnerClassName( ratio ),
			{
				'has-padding': getPaddingStyle( padding ),
			}
		),
		style: {
			...getPaddingStyle( padding ),
			...getContentPositionStyle(contentPosition),
		}
	}
	/**
	 * Overlay
	 */
	const hasOverlay = backgroundImage || backgroundColor || gradientClass || gradientValue;
	const borderColorClass = getBorderColorClass( border?.color );
	const overlayProps = {
		className: classnames(
			blockClasses.overlay,
			{
				'has-background': backgroundColor.color,
				[ backgroundColor.class ]: backgroundColor.class,
				'has-background-gradient': gradientValue,
				[ gradientClass ]: gradientClass,
				[ borderColorClass ]: borderColorClass,
			}
		),
		style: {
			background: getOverlayBackGround( backgroundColor.color, gradientValue ),
			opacity: backgroundOpacity,
			borderRadius: borderRadius || undefined,
			...getBorderStyle( border ),
		}
	}
	/**
	 * Text
	 */
	const textWrapProps = {
		className: classnames(
			blockClasses.text,
			{}
		),
	}
	/**
	 * Main Text
	 */
	const mainTextClass = classnames(
		blockClasses.mainText,
		{
			'has-font-size': mainTextFontSize,
			[ fontSizeClasses.mainText ]: fontSizeClasses.mainText,
			[ clearStyle ]: isClearStyle( mainTextHtml, mainTextStyleClear ),
		}
	);
	const mainTextStyles = {
		color: mainTextColor.color,
		...getFontSizeStyle( mainTextFontSize, fontSizeClasses.mainText ),
		lineHeight: mainTextLineHeight,
		letterSpacing: mainTextLetterSpacing,
	};
	/**
	 * Sub Text
	 */
	const subTextClass = classnames(
		blockClasses.subText,
		{
			'has-margin-top': getCustomProperty( 'margin-top', subTextMargin ),
			'has-font-size': subTextFontSize,
			[ fontSizeClasses.subText ]: fontSizeClasses.subText,
			[ clearStyle ]: isClearStyle( subTextHtml, subTextStyleClear ),
		}
	);
	const subTextStyles = {
		color: subTextColor.color,
		...getFontSizeStyle( subTextFontSize, fontSizeClasses.subText ),
		lineHeight: subTextLineHeight,
		letterSpacing: subTextLetterSpacing,
		...getCustomProperty( 'margin-top', subTextMargin )
	};

	return (
		<>
			<BlockControls
				{ ...{
					anchorRef: blockProps.ref,
					...props,
				} }
			/>
			<InspectorControls { ...props } />

			<div { ...wrapProps }>
				<div { ...blockProps }>
					{ ( hasOverlay &&
						<div
							aria-hidden="true"
							{ ...overlayProps }
						/>
					) }
					<div { ...containerProps }>
						<div { ...textWrapProps }>
							<RichText
								tagName={ mainTextHtml }
								className={ mainTextClass }
								style={ mainTextStyles }
								value={ mainText }
								onChange={ ( value ) => setAttributes( { mainText: value } ) }
								identifier="mainText"
								placeholder={ __( 'メインテキスト', 'ystandard-toolbox' ) }
								withoutInteractiveFormatting
							/>
							<RichText
								tagName={ subTextHtml }
								className={ subTextClass }
								style={ subTextStyles }
								value={ subText }
								onChange={ ( value ) => setAttributes( { subText: value } ) }
								identifier="subText"
								placeholder={ __( 'サブテキスト', 'ystandard-toolbox' ) }
								withoutInteractiveFormatting
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default compose( [
	withColors( {
		backgroundColor: 'background-color',
		mainTextColor: 'color',
		subTextColor: 'color',
	} ),
] )( BannerLink );
