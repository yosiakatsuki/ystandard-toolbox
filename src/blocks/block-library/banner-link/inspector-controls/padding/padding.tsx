/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Plugin Dependencies
 */
import ResponsiveSpacing from '@aktk/components/responsive-spacing';
import { getResponsiveValues } from '@aktk/helper/responsive';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

const Padding = ( props ) => {
	const { attributes, setAttributes } = props;

	const { padding } = attributes;

	const handleOnChange = ( values ) => {
		setAttributes( {
			padding: getResponsiveValues( values ),
		} );
	};

	return (
		<BaseControl id="banner-padding">
			<ResponsiveSpacing
				label={ __( '内側余白', 'ystandard-toolbox' ) }
				values={ padding }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};

export default Padding;
