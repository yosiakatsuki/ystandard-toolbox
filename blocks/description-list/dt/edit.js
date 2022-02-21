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
import { getResponsivePaddingStyle } from "@ystdtb/components/responsive-spacing";
import { getResponsiveFontSizeStyle } from "@ystdtb/components/responsive-font-size";
import { getFontSizeClassByObject } from "@ystdtb/helper/fontSize";
import { getBackGroundStyle } from "@ystdtb/helper/color";
import { ystdtbConfig } from "@ystdtb/config";
/**
 * Block
 */
import { DescriptionListDtInspectorControls as InspectorControls } from './inspector-controls';
import { config } from './config';


const edit = ( props ) => {
	const {
		attributes,
		setAttributes,
		backgroundColor,
		textColor,
	} = props;

	const {
		text,
		textSize,
		padding,
	} = attributes

	const hasClasses = ystdtbConfig.hasClasses;
	const { gradientClass, gradientValue } = __experimentalUseGradient();

	const fontSizeClass = getFontSizeClassByObject( textSize?.desktop );

	const blockProps = useBlockProps( {
		className: classnames(
			config.blockClasses,
			'ystdtb-dt-editor',
			{
				[ hasClasses.fontSize ]: fontSizeClass || textSize?.desktop,
				[ fontSizeClass ]: fontSizeClass,
				[ hasClasses.background ]: backgroundColor.color || gradientValue,
				[ backgroundColor.class ]: backgroundColor.class,
				[ hasClasses.textColor ]: textColor.color,
				[ textColor.class ]: textColor.class,
				[ hasClasses.backgroundGradient ]: gradientValue,
				[ gradientClass ]: gradientClass,
				[ hasClasses.padding ]: getResponsivePaddingStyle( 'dt', padding ),
			}
		),
		style: {
			background: getBackGroundStyle( backgroundColor, gradientValue ),
			...getResponsivePaddingStyle( 'dt', padding ),
			...getResponsiveFontSizeStyle( 'dt', textSize, fontSizeClass ),
		}
	} );
	return (
		<>
			<InspectorControls { ...props } />
			<RichText
				tagName="dt"
				value={ text }
				onChange={ ( value ) =>
					setAttributes( { text: value } )
				}
				identifier="text"
				placeholder={ __(
					'説明タイトル',
					'ystandard-toolbox'
				) }
				{ ...blockProps }
			/>
		</>
	);
}

export default compose( [
	withColors( {
		backgroundColor: 'background-color',
		textColor: 'color',
	} ),
] )( edit );
