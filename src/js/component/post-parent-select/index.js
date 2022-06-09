/**
 * WordPress.
 */
import { SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { getParentPages } from '@aktk/helper/page';
import { addDefaultSelect } from '@aktk/helper/select-control';

const PostParentSelect = ( { label, value, postType, onChange } ) => {
	const { hierarchicalPages } = useSelect( ( select ) => {
		const { getPostType, getEntityRecords } = select( 'core' );
		const _postType = getPostType( postType );
		if ( ! _postType?.hierarchical ) {
			return { hierarchicalPages: undefined };
		}
		const pages = getEntityRecords( 'postType', postType, {
			per_page: -1,
		} );
		return {
			hierarchicalPages: getParentPages( pages, 0, 0 ),
		};
	} );
	const options = addDefaultSelect( hierarchicalPages );
	const handleOnChange = ( newValue ) => {
		onChange( newValue );
	};
	return (
		<>
			<SelectControl
				label={ label }
				value={ value }
				options={ options }
				onChange={ handleOnChange }
			/>
		</>
	);
};
export default PostParentSelect;
