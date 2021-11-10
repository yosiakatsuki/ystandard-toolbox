import { __ } from '@wordpress/i18n';

import ResponsiveFontSize from "@ystdtb/components/responsive-font-size";
import { getResponsiveValues } from "@ystdtb/helper/responsive";

const FontSize = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const { mainTextFontSize } = attributes;

	const handleOnChange = ( values ) => {
		setAttributes( {
			mainTextFontSize: getResponsiveValues( values ),
		} );
	}

	return (
		<ResponsiveFontSize
			label={ __( 'フォントサイズ', 'ystandard-toolbox' ) }
			values={ mainTextFontSize }
			onChange={ handleOnChange }
		/>
	);
}
export default FontSize;
