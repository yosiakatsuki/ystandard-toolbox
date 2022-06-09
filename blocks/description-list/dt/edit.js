import classnames from 'classnames';
/**
 * WordPress
 */
import {
	RichText,
	withColors,
	useBlockProps,
	__experimentalUseGradient,
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
/**
 * yStandard
 */
import {
	getResponsiveMarginStyle,
	getResponsivePaddingStyle,
} from '@aktk/components/responsive-spacing';
import { getResponsiveFontSizeStyle } from '@aktk/components/responsive-font-size';
import { getFontSizeClassByObject } from '@aktk/helper/fontSize';
import { getBackGroundStyle } from '@aktk/helper/color';
import { ystdtbConfig } from '@aktk/config';
/**
 * Block
 */
import { DescriptionListDtInspectorControls as InspectorControls } from './inspector-controls';
import { config } from './config';

const Edit = ( props ) => {
	const { attributes, setAttributes, backgroundColor, textColor } = props;

	const {
		text,
		textSize,
		padding,
		margin,
		fontWeight,
		fontStyle,
		lineHeight,
		letterSpacing,
	} = attributes;

	const hasClasses = ystdtbConfig.hasClasses;
	const { gradientClass, gradientValue } = __experimentalUseGradient();

	const fontSizeClass = getFontSizeClassByObject( textSize?.desktop );

	const blockProps = useBlockProps( {
		className: classnames( config.blockClasses, 'ystdtb-dt-editor', {
			[ hasClasses.fontSize ]: fontSizeClass || textSize?.desktop,
			[ fontSizeClass ]: fontSizeClass,
			[ hasClasses.background ]: backgroundColor.color || gradientValue,
			[ backgroundColor.class ]: backgroundColor.class,
			[ hasClasses.textColor ]: textColor.color,
			[ textColor.class ]: textColor.class,
			[ hasClasses.backgroundGradient ]: gradientValue,
			[ gradientClass ]: gradientClass,
			[ hasClasses.padding ]: getResponsivePaddingStyle( padding ),
			[ hasClasses.margin ]: getResponsiveMarginStyle( margin ),
		} ),
		style: {
			background: getBackGroundStyle( backgroundColor, gradientValue ),
			...getResponsivePaddingStyle( padding ),
			...getResponsiveMarginStyle( margin ),
			...getResponsiveFontSizeStyle( textSize, fontSizeClass ),
			fontWeight,
			fontStyle,
			lineHeight,
			letterSpacing,
		},
	} );
	return (
		<>
			<InspectorControls { ...props } />
			<RichText
				tagName="dt"
				value={ text }
				onChange={ ( value ) => setAttributes( { text: value } ) }
				identifier="text"
				placeholder={ __( '説明タイトル', 'ystandard-toolbox' ) }
				{ ...blockProps }
			/>
		</>
	);
};

export default compose( [
	withColors( {
		backgroundColor: 'background-color',
		textColor: 'color',
	} ),
] )( Edit );
