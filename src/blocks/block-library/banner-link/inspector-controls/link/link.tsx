/*
 * WordPress Dependencies
 */
import { URLInput } from '@wordpress/block-editor';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

const Link = ( props ) => {
	const { attributes, setAttributes } = props;

	const { link } = attributes;

	const handleOnChange = ( value ) => {
		setAttributes( {
			link: {
				...link,
				url: value,
			},
		} );
	};
	return (
		<BaseControl id="link-url">
			<URLInput value={ link?.url ?? '' } onChange={ handleOnChange } />
		</BaseControl>
	);
};
export default Link;
