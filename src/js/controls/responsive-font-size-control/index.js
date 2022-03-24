import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import ResponsiveFontSize from '@ystdtb/components/responsive-font-size';
import { getResponsiveValues } from '@ystdtb/helper/responsive';

const ResponsiveFontSizeControl = ( { label, values, onChange, ...props } ) => {

	const handleOnChange = ( values ) => {
		onChange( getResponsiveValues( values ) );
	};

	return (
		<BaseControl>
			<ResponsiveFontSize
				label={ label ? label : __( 'フォントサイズ', 'ystandard-toolbox' ) }
				values={ values }
				onChange={ handleOnChange }
				{ ...props }
			/>
		</BaseControl>
	);
};
export default ResponsiveFontSizeControl;
