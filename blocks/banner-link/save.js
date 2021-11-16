import classnames from "classnames";
import {
	RichText,
	getColorClassName,
	__experimentalGetGradientClass,
	useBlockProps,
} from '@wordpress/block-editor';
import { getFontSizeClassByObject } from "@ystdtb/helper/fontSize";
import { blockClassName, blockClasses } from "./config";
import { getRatioClassName, getRatioInnerClassName } from "@ystdtb/helper/ratio";
import {
	getBackgroundImage,
	getBackgroundPosition, getContentPositionStyle,
	getCustomProperty,
	getFontSizeStyle,
	getOverlayBackGround, getPaddingStyle, isClearStyle
} from "./function/style";
import { getBoxShadowStyle } from "@ystdtb/components/box-shadow-control";
import { getBorderColorClass, getBorderStyle } from "@ystdtb/components/border-control";
import { getComponentConfig } from "@ystdtb/helper/config";

const save = ( { attributes } ) => {

	const {
		link,
		backgroundImage,
		backgroundImageFocalPoint,
		backgroundOpacity,
		backgroundColor,
		customBackgroundColor,
		gradient,
		customGradient,
		ratio,
		size,
		borderRadius,
		border,
		mainText,
		mainTextFontSize,
		mainTextColor,
		customMainTextColor,
		mainTextLineHeight,
		mainTextLetterSpacing,
		mainTextHtml,
		mainTextStyleClear,
		subText,
		subTextFontSize,
		subTextColor,
		customSubTextColor,
		subTextLineHeight,
		subTextLetterSpacing,
		subTextHtml,
		subTextStyleClear,
		subTextMargin,
		padding,
		boxShadow,
		contentPosition,
	} = attributes;

	const clearStyle = getComponentConfig( 'headingClearStyle' );

	const colorClasses = {
		backgroundColor: getColorClassName( 'background-color', backgroundColor ) ?? '',
		borderColor: getBorderColorClass( border?.color ) ?? '',
		gradient: __experimentalGetGradientClass( gradient ) ?? '',
		mainText: getColorClassName( 'color', mainTextColor ) ?? '',
		subText: getColorClassName( 'color', subTextColor ) ?? '',
	};

	const fontSizeClasses = {
		mainText: getFontSizeClassByObject( mainTextFontSize?.desktop ),
		subText: getFontSizeClassByObject( subTextFontSize?.desktop ),
	};

	/**
	 * Block
	 */
	const blockProps = useBlockProps.save( {
		href: link?.url,
		target: link?.linkTarget || undefined,
		rel: link?.rel || undefined,
		className: classnames(
			blockClassName,
			getRatioClassName( ratio ),
		),
		style: {
			backgroundImage: getBackgroundImage( backgroundImage ),
			backgroundPosition: getBackgroundPosition( backgroundImageFocalPoint ),
			...getBoxShadowStyle( boxShadow ),
			...getCustomProperty( 'max-width', size?.maxWidth ),
			...getCustomProperty( 'min-height', size?.minHeight ),
			borderRadius: borderRadius || undefined,
		},
	} );

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
			...getContentPositionStyle( contentPosition ),
		}
	}

	/**
	 * Overlay
	 */
	/**
	 * Overlay
	 */
	const hasBackgroundColor = backgroundColor || customBackgroundColor;
	const hasGradient = gradient || customGradient;
	const hasOverlay = backgroundImage || hasBackgroundColor || hasGradient;
	const overlayProps = {
		className: classnames(
			blockClasses.overlay,
			{
				'has-background': hasBackgroundColor,
				[ colorClasses.backgroundColor ]: colorClasses.backgroundColor,
				'has-background-gradient': hasGradient,
				[ colorClasses.gradient ]: colorClasses.gradient,
				[ colorClasses.borderColor ]: colorClasses.borderColor,
			}
		),
		style: {
			background: getOverlayBackGround( customBackgroundColor, customGradient ),
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
	const hasMainTextColor = colorClasses.mainText || customMainTextColor;
	const mainTextProps = {
		value: mainText,
		tagName: mainTextHtml,
		className: classnames(
			blockClasses.mainText,
			{
				'has-font-size': mainTextFontSize,
				'has-text-color': hasMainTextColor,
				[ colorClasses.mainText ]: colorClasses.mainText,
				[ fontSizeClasses.mainText ]: fontSizeClasses.mainText,
				[ clearStyle ]: isClearStyle( mainTextHtml, mainTextStyleClear ),
			}
		),
		style: {
			color: customMainTextColor,
			...getFontSizeStyle( mainTextFontSize, fontSizeClasses.mainText ),
			lineHeight: mainTextLineHeight,
			letterSpacing: mainTextLetterSpacing,
		}
	}

	/**
	 * Sub Text
	 */
	const hasSubTextColor = colorClasses.subText || customSubTextColor;
	const subTextProps = {
		value: subText,
		tagName: 'div',
		className: classnames(
			blockClasses.subText,
			{
				'has-margin-top': getCustomProperty( 'margin-top', subTextMargin ),
				'has-font-size': subTextFontSize,
				'has-text-color': hasSubTextColor,
				[ colorClasses.subText ]: colorClasses.subText,
				[ fontSizeClasses.subText ]: fontSizeClasses.subText,
				[ clearStyle ]: isClearStyle( subTextHtml, subTextStyleClear ),
			}
		),
		style: {
			color: customSubTextColor,
			...getFontSizeStyle( subTextFontSize, fontSizeClasses.subText ),
			lineHeight: subTextLineHeight,
			letterSpacing: subTextLetterSpacing,
			...getCustomProperty( 'margin-top', subTextMargin )
		}
	}

	return (
		<a { ...blockProps }>
			{ ( hasOverlay &&
				<div
					aria-hidden="true"
					{ ...overlayProps }
				/>
			) }
			<div { ...containerProps }>
				<div { ...textWrapProps }>
					{ ( mainText &&
						<RichText.Content { ...mainTextProps }/>
					) }
					{ ( subText &&
						<RichText.Content { ...subTextProps }/>
					) }
				</div>
			</div>
		</a>
	);
};

export default save;
