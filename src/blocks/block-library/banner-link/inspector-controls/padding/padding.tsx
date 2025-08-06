/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Plugin Dependencies
 */
import { ResponsiveSpacingSelect } from '@aktk/block-components/components/custom-spacing-select';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

const Padding = ( props ) => {
	const { attributes, setAttributes } = props;

	const { padding } = attributes;

	const handleOnChange = ( values ) => {
		setAttributes( {
			padding: values,
		} );
	};

	return (
		<BaseControl
			id="banner-padding"
			label={ __( '内側余白', 'ystandard-toolbox' ) }
		>
			<ResponsiveSpacingSelect
				value={ padding }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};

export default Padding;
