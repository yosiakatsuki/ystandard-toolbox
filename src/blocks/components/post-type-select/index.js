/**
 * WordPress.
 */
import { SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { filterSelectPostTypes } from '@aktk/helper/post-type';

const PostTypeSelect = ( { label, value, onChange } ) => {
	const { postTypes } = useSelect( ( select ) => {
		const { getPostTypes } = select( 'core' );
		const types = getPostTypes( { per_page: -1 } ) || [];
		return {
			postTypes: filterSelectPostTypes( types ),
		};
	} );

	const postTypesOptions = postTypes.map( ( { name, slug } ) => ( {
		value: slug,
		label: name,
	} ) );
	const handleOnChange = ( newValue ) => {
		onChange( newValue );
	};
	return (
		<SelectControl
			label={ label }
			value={ value }
			options={ postTypesOptions }
			onChange={ handleOnChange }
		/>
	);
};
export default PostTypeSelect;
