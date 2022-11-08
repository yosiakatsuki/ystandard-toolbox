import classnames from 'classnames';
/**
 * WordPress
 */
import {
	InnerBlocks,
	getColorClassName,
	__experimentalGetGradientClass,
	useBlockProps,
} from '@wordpress/block-editor';
/**
 * yStandard
 */
import {
	getResponsiveMarginStyle,
	getResponsivePaddingStyle,
} from '@aktk/components/responsive-spacing';
import { getBackGroundStyle } from '@aktk/helper/color';
import { ystdtbConfig } from '@aktk/config';
/**
 * Block
 */
import { config } from './config';

const save = ( { attributes } ) => {
	const {
		padding,
		margin,
		backgroundColor,
		customBackgroundColor,
		gradient,
		customGradient,
		textColor,
		customTextColor,
	} = attributes;

	const hasClasses = ystdtbConfig.hasClasses;
	const colorClasses = {
		backgroundColor:
			getColorClassName( 'background-color', backgroundColor ) ?? '',
		gradient: __experimentalGetGradientClass( gradient ) ?? '',
		text: getColorClassName( 'color', textColor ) ?? '',
	};

	const blockProps = useBlockProps.save( {
		className: classnames( config.blockClasses, {
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
		},
	} );

	return (
		<dd { ...blockProps }>
			<InnerBlocks.Content />
		</dd>
	);
};

export default save;
