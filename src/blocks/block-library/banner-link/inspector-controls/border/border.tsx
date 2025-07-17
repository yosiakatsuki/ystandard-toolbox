/*
 * Plugin Dependencies
 */
import BorderControl from '@aktk/controls/border-control';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

const Border = ( { attributes, setAttributes } ) => {
	const { border } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( {
			border: value,
		} );
	};
	return (
		<BaseControl id="banner-border">
			<BorderControl value={ border } onChange={ handleOnChange } />
		</BaseControl>
	);
};
export default Border;
