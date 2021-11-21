import { BaseControl } from '@wordpress/components';
import InputControl from '@ystdtb/components/input-controls';
import { __ } from '@wordpress/i18n';

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
		<BaseControl>
			<InputControl
				label={ __( 'rel', 'ystandard-toolbox' ) }
				value={ link?.rel }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default Rel;
