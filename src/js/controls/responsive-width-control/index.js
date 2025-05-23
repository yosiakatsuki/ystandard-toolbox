import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { getResponsiveValues } from '@ystd/helper/responsive';
import ResponsiveValues from '@ystd/components/responsive-values';

const ResponsiveWidthControl = ( { label, values, onChange, ...props } ) => {
	const handleOnChange = ( newValue ) => {
		onChange( getResponsiveValues( newValue ) );
	};

	return (
		<BaseControl __nextHasNoMarginBottom>
			<ResponsiveValues
				label={ label ? label : __( '幅', 'ystandard-toolbox' ) }
				values={ values }
				onChange={ handleOnChange }
				{ ...props }
			/>
		</BaseControl>
	);
};

export default ResponsiveWidthControl;
