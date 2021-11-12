import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import BorderControl from "@ystdtb/components/border-control";

const Border = ( { attributes, setAttributes } ) => {

	const { border } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( {
			border: value,
		} );
	}
	return (
		<BaseControl>
			<BorderControl
				value={ border }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
export default Border;
