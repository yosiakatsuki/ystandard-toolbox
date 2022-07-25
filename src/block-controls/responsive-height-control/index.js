import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { getResponsiveValues } from '@aktk/helper/responsive';
import ResponsiveValues from '@aktk/components/responsive-values';

const ResponsiveHeightControl = ( { label, values, onChange, ...props } ) => {
	const handleOnChange = ( newValue ) => {
		onChange( getResponsiveValues( newValue ) );
	};

	return (
		<BaseControl>
			<ResponsiveValues
				label={ label ? label : __( '高さ', 'ystandard-toolbox' ) }
				values={ values }
				onChange={ handleOnChange }
				{ ...props }
			/>
		</BaseControl>
	);
};

export default ResponsiveHeightControl;
