import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { getResponsiveValues } from '@aktk/helper/responsive';
import ResponsiveRatio from '@aktk/components/responsive-ratio';

const ResponsiveRatioControl = ( { label, values, onChange } ) => {
	const handleOnChange = ( newValue ) => {
		onChange( getResponsiveValues( newValue ) );
	};
	return (
		<BaseControl>
			<ResponsiveRatio
				label={ label ? label : __( '縦横比', 'ystandard-toolbox' ) }
				values={ values }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};

export default ResponsiveRatioControl;
