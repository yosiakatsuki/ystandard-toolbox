import classnames from 'classnames';
/**
 * WordPress
 */
import {
	RichText,
	getColorClassName,
	__experimentalGetGradientClass,
	useBlockProps,
} from '@wordpress/block-editor';
/**
 * yStandard
 */
import { getResponsiveFontSizeStyle } from '@ystdtb/components/responsive-font-size';
import { getResponsiveMarginStyle, getResponsivePaddingStyle } from '@ystdtb/components/responsive-spacing';
import { getFontSizeClassByObject } from '@ystdtb/helper/fontSize';
import { getBackGroundStyle } from '@ystdtb/helper/color';
import { ystdtbConfig } from '@ystdtb/config';
/**
 * Block
 */
import { config } from './config';

const save = ( { attributes } ) => {
	const {
		text,
		padding,
		margin,
		backgroundColor,
		customBackgroundColor,
		gradient,
		customGradient,
		textColor,
		customTextColor,
		textSize,
		fontWeight,
		fontStyle,
		lineHeight,
		letterSpacing,
	} = attributes;

	const hasClasses = ystdtbConfig.hasClasses;
	const colorClasses = {
		backgroundColor:
			getColorClassName( 'background-color', backgroundColor ) ?? '',
		gradient: __experimentalGetGradientClass( gradient ) ?? '',
		text: getColorClassName( 'color', textColor ) ?? '',
	};
	const fontSizeClass = getFontSizeClassByObject( textSize?.desktop );

	const blockProps = useBlockProps.save( {
		className: classnames( config.blockClasses, {
			[ hasClasses.fontSize ]: fontSizeClass,
			[ fontSizeClass ]: fontSizeClass,
			[ hasClasses.background ]:
				backgroundColor ||
				customBackgroundColor ||
				gradient ||
				customGradient,
			[ colorClasses.backgroundColor ]: colorClasses.backgroundColor,
			[ hasClasses.textColor ]: textColor || customTextColor,
			[ colorClasses.text ]: colorClasses.text,
			[ hasClasses.backgroundGradient ]: gradient || customGradient,
			[ colorClasses.gradient ]: colorClasses.gradient,
			[ hasClasses.padding ]: getResponsivePaddingStyle(
				config.responsiveStyleClassPrefix,
				padding
			),
			[ hasClasses.margin ]: getResponsiveMarginStyle(
				config.responsiveStyleClassPrefix,
				margin
			),
		} ),
		style: {
			background: getBackGroundStyle(
				customBackgroundColor,
				customGradient
			),
			color: customTextColor,
			...getResponsivePaddingStyle(
				config.responsiveStyleClassPrefix,
				padding
			),
			... getResponsiveMarginStyle(
				config.responsiveStyleClassPrefix,
				margin
			),
			...getResponsiveFontSizeStyle(
				config.responsiveStyleClassPrefix,
				textSize,
				fontSizeClass
			),
			fontWeight: fontWeight || undefined,
			fontStyle: fontStyle || undefined,
			lineHeight: lineHeight || undefined,
			letterSpacing: letterSpacing || undefined,
		},
	} );

	return (
		<dd { ...blockProps }>
			<RichText.Content value={ text } />
		</dd>
	);
};

export default save;
