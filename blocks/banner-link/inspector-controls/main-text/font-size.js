import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import ResponsiveFontSize from '@ystd/components/responsive-font-size';
import { getResponsiveValues } from '@ystd/helper/responsive';

const FontSize = ( props ) => {
	const { attributes, setAttributes } = props;

	const { mainTextFontSize } = attributes;

	const handleOnChange = ( values ) => {
		setAttributes( {
			mainTextFontSize: getResponsiveValues( values ),
		} );
	};

	return (
		<BaseControl>
			<ResponsiveFontSize
				label={ __( 'フォントサイズ', 'ystandard-toolbox' ) }
				values={ mainTextFontSize }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default FontSize;
