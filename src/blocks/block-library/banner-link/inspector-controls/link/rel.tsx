/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Plugin Dependencies
 */
import InputControl from '@aktk/block-components/wp-controls/input-control';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

const Rel = ( { attributes, setAttributes } ) => {
	const { link } = attributes;

	const handleOnChange = ( value ) => {
		setAttributes( {
			link: {
				...link,
				rel: value,
			},
		} );
	};
	return (
		<BaseControl id="link-rel">
			<InputControl
				label={ __( 'rel', 'ystandard-toolbox' ) }
				value={ link?.rel ?? '' }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default Rel;
