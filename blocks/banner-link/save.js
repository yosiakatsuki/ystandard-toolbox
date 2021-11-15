import classnames from "classnames";
import {
	RichText,
	getColorClassName,
	useBlockProps,
} from '@wordpress/block-editor';
import { getFontSizeClassByObject } from "@ystdtb/helper/fontSize";
import { blockClassName, blockControlClasses } from "./config";

const save = ( { attributes } ) => {

	const {
		mainText,
		mainTextFontSize,
		subText,
		subTextFontSize,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: classnames( blockClassName ),
	} );

	const fontSizeClass = {
		mainText: getFontSizeClassByObject( mainTextFontSize?.desktop ),
	}

	const mainTextProps = {
		value: mainText,
		tagName: 'div',
		className: classnames(
			blockControlClasses.mainText,
			{
				[ fontSizeClass.mainText ]: fontSizeClass.mainText
			}
		),
		style: {
			fontSize: ! fontSizeClass.mainText && mainTextFontSize?.desktop?.size ?
				mainTextFontSize?.desktop?.size : undefined,
		}
	}
	const subTextProps = {
		value: subText,
		tagName: 'div',
		className: classnames(
			blockControlClasses.subText,
			{
				[ fontSizeClass.subText ]: fontSizeClass.subText
			}
		),
		style: {
			fontSize: ! fontSizeClass.subText && mainTextFontSize?.desktop?.size ?
				mainTextFontSize?.desktop?.size : undefined,
		}
	}

	return (
		<div { ...blockProps }>
			{ ( mainText &&
				<RichText.Content { ...mainTextProps }/>
			) }
			{ ( subText &&
				<RichText.Content { ...subTextProps }/>
			) }
		</div>
	);
};

export default save;
