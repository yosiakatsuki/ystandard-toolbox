import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { getResponsiveValues } from '@aktk/helper/responsive';
import ResponsiveLayout from '@aktk/components/responsive-layout';

const ResponsiveLayoutControl = ( { label, values, onChange, ...props } ) => {
	const handleOnChange = ( newValue ) => {
		onChange( getResponsiveValues( newValue ) );
	};
	return (
		<BaseControl>
			<ResponsiveLayout
				label={
					label ? label : __( 'レイアウト', 'ystandard-toolbox' )
				}
				values={ values }
				onChange={ handleOnChange }
				{ ...props }
			/>
		</BaseControl>
	);
};
export default ResponsiveLayoutControl;
