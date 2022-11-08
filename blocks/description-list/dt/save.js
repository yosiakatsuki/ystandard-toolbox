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
import { getResponsiveFontSizeStyle } from '@aktk/components/responsive-font-size';
import {
	getResponsiveMarginStyle,
	getResponsivePaddingStyle,
} from '@aktk/components/responsive-spacing';
import { getFontSizeClassByObject } from '@aktk/helper/fontSize';
import { getBackGroundStyle } from '@aktk/helper/color';
import { ystdtbConfig } from '@aktk/config';
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
			[ hasClasses.padding ]: getResponsivePaddingStyle( padding ),
			[ hasClasses.margin ]: getResponsiveMarginStyle( margin ),
		} ),
		style: {
			background: getBackGroundStyle(
				customBackgroundColor,
				customGradient
			),
			color: customTextColor,
			...getResponsivePaddingStyle( padding ),
			...getResponsiveMarginStyle( margin ),
			...getResponsiveFontSizeStyle( textSize, fontSizeClass ),
			fontWeight: fontWeight || undefined,
			fontStyle: fontStyle || undefined,
			lineHeight: lineHeight || undefined,
			letterSpacing: letterSpacing || undefined,
		},
	} );

	return (
		<dt { ...blockProps }>
			<RichText.Content value={ text } />
		</dt>
	);
};

export default save;
