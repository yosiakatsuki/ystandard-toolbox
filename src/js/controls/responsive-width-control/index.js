import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { getResponsiveValues } from '@ystdtb/helper/responsive';
import ResponsiveValues from "@ystdtb/components/responsive-values";

const ResponsiveWidthControl = ( { label, values, onChange, ...props } ) => {

	const handleOnChange = ( newValue ) => {
		onChange( getResponsiveValues( newValue ) );
	};

	return (
		<BaseControl>
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
