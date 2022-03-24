import { BaseControl } from '@wordpress/components';

import BorderControl from '@ystdtb/controls/border-control';

const Border = ( { attributes, setAttributes } ) => {
	const { border } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( {
			border: value,
		} );
	};
	return (
		<BaseControl>
			<BorderControl value={ border } onChange={ handleOnChange } />
		</BaseControl>
	);
};
export default Border;
