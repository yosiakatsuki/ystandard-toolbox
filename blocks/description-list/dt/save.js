import classnames from 'classnames';
import {
	RichText,
	getColorClassName,
	__experimentalGetGradientClass,
	useBlockProps,
} from '@wordpress/block-editor';
import { getFontSizeClassByObject } from '@ystdtb/helper/fontSize';
import { config } from "./config";
import { getDTPaddingStyle, getFontSizeStyle } from "./function/style";
import { getBackGroundStyle } from "@ystdtb/helper/color";
import { ystdtbConfig } from "@ystdtb/config";

const save = ( { attributes } ) => {
	const {
		text,
		padding,
		backgroundColor,
		customBackgroundColor,
		gradient,
		customGradient,
		textColor,
		customTextColor,
		textSize,
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
		className: classnames(
			config.blockClasses,
			{
				[ hasClasses.fontSize ]: fontSizeClass,
				[ fontSizeClass ]: fontSizeClass,
				[ hasClasses.background ]: backgroundColor || customBackgroundColor,
				[ colorClasses.backgroundColor ]: colorClasses.backgroundColor,
				[ hasClasses.textColor ]: textColor || customTextColor,
				[ colorClasses.text ]: colorClasses.text,
				[ hasClasses.backgroundGradient ]: gradient || customGradient,
				[ colorClasses.gradient ]: colorClasses.gradient,
				[ hasClasses.padding ]: getDTPaddingStyle( padding ),
			}
		),
		style: {
			background: getBackGroundStyle( customBackgroundColor, customGradient ),
			color: customTextColor,
			...getDTPaddingStyle( padding ),
			...getFontSizeStyle( textSize, fontSizeClass ),
		}
	} );

	return (
		<dt { ...blockProps }>
			<RichText.Content value={ text }/>
		</dt>
	);
};

export default save;
