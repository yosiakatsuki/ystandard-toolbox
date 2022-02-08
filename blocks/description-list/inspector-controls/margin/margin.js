import { BaseControl } from '@wordpress/components';
import ResponsiveSpacing from '@ystdtb/components/responsive-spacing';
import { __ } from '@wordpress/i18n';

import { getResponsiveValues } from '@ystdtb/helper/responsive';

const Margin = ( props ) => {
	const { attributes, setAttributes } = props;

	const { margin } = attributes;

	const handleOnChange = ( values ) => {
		setAttributes( {
			margin: getResponsiveValues( values ),
		} );
	};

	return (
		<BaseControl>
			<ResponsiveSpacing
				label={ __( '外側余白(margin)', 'ystandard-toolbox' ) }
				values={ margin }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};

export default Margin;
