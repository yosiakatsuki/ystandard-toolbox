import InputControl from "@ystdtb/components/input-controls";
import { __ } from '@wordpress/i18n';

const Rel = ( { attributes, setAttributes } ) => {

	const { link } = attributes;

	const handleOnChange = ( value ) => {
		setAttributes( {
			link: {
				...link,
				rel: value,
			}
		} );
	}
	return (
		<InputControl
			label={ __( 'rel', 'ystandard-toolbox' ) }
			value={ link?.rel }
			onChange={ handleOnChange }
		/>
	);
};
export default Rel;
