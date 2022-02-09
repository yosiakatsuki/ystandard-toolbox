import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import ResponsiveFontSize from '@ystdtb/components/responsive-font-size';
import { getResponsiveValues } from '@ystdtb/helper/responsive';

const FontSize = ( props ) => {
	const { attributes, setAttributes } = props;

	const { textSize } = attributes;

	const handleOnChange = ( values ) => {
		setAttributes( {
			textSize: getResponsiveValues( values ),
		} );
	};

	return (
		<BaseControl>
			<ResponsiveFontSize
				label={ __( 'フォントサイズ', 'ystandard-toolbox' ) }
				values={ textSize }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default FontSize;
