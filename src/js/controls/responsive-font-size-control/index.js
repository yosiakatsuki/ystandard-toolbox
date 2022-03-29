import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import ResponsiveFontSize from '@ystd/components/responsive-font-size';
import { getResponsiveValues } from '@ystd/helper/responsive';

const ResponsiveFontSizeControl = ( { label, values, onChange, ...props } ) => {
	const handleOnChange = ( newValues ) => {
		onChange( getResponsiveValues( newValues ) );
	};

	return (
		<BaseControl>
			<ResponsiveFontSize
				label={
					label ? label : __( 'フォントサイズ', 'ystandard-toolbox' )
				}
				values={ values }
				onChange={ handleOnChange }
				{ ...props }
			/>
		</BaseControl>
	);
};
export default ResponsiveFontSizeControl;
