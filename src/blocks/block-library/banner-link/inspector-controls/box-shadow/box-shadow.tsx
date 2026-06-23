/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { BoxShadowControl } from '@aktk/block-components/components/box-shadow-control';

const BoxShadow = ( props ) => {
	const { attributes, setAttributes } = props;
	const { boxShadow } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( {
			boxShadow: value,
		} );
	};
	return (
		<BaseControl id="banner-box-shadow">
			<BoxShadowControl onChange={ handleOnChange } value={ boxShadow } />
		</BaseControl>
	);
};
export default BoxShadow;
