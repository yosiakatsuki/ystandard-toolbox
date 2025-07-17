import { URLInput } from '@wordpress/block-editor';
import { BaseControl } from '@wordpress/components';

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
		<BaseControl>
			<URLInput value={ link?.url ?? '' } onChange={ handleOnChange } />
		</BaseControl>
	);
};
export default Link;
