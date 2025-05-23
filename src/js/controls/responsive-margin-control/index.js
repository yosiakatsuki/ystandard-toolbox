import { BaseControl } from '@wordpress/components';
import ResponsiveSpacing from '@ystd/components/responsive-spacing';
import { __ } from '@wordpress/i18n';

import { getResponsiveValues } from '@ystd/helper/responsive';

const ResponsiveMarginControl = ( {
	label,
	values,
	onChange,
	min = -9999,
	...props
} ) => {
	const handleOnChange = ( newValue ) => {
		onChange( getResponsiveValues( newValue ) );
	};

	return (
		<BaseControl __nextHasNoMarginBottom>
			<ResponsiveSpacing
				{ ...props }
				label={
					label
						? label
						: __( '外側余白(margin)', 'ystandard-toolbox' )
				}
				values={ values }
				onChange={ handleOnChange }
				inputProps={ {
					min,
				} }
			/>
		</BaseControl>
	);
};

export default ResponsiveMarginControl;
