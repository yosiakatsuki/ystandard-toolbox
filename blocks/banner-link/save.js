import {
	InnerBlocks,
	getColorClassName,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	responsiveKeys as keys,
	getResponsiveProperty
} from "@ystdtb/helper/responsive";
import { getFontSizeClassByObject } from "@ystdtb/helper/fontSize";

const Save = ( { attributes } ) => {

	const {
		mainTextFontSize,
	} = attributes;

	const fontSizeClass = {
		mainText: getFontSizeClassByObject( getResponsiveProperty( mainTextFontSize, keys.desktop ) ),
	}

	return (
		<div>テスト</div>
	);
};

export default Save;
