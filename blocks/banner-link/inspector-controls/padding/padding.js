import { BaseControl } from '@wordpress/components';
import ResponsiveSpacing from '@ystdtb/components/responsive-spacing';
import { __ } from '@wordpress/i18n';

import { getResponsiveValues } from '@ystdtb/helper/responsive';

const Padding = ( props ) => {
	const { attributes, setAttributes } = props;

	const { padding } = attributes;

	const handleOnChange = ( values ) => {
		setAttributes( {
			padding: getResponsiveValues( values ),
		} );
	};

	return (
		<BaseControl>
			<ResponsiveSpacing
				label={ __( '内側余白', 'ystandard-toolbox' ) }
				values={ padding }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};

export default Padding;
