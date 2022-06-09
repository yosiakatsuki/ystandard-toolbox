import { __ } from '@wordpress/i18n';
import { BaseControl } from '@wordpress/components';
import PostParentSelect from '@aktk/components/post-parent-select';
import { useSelect } from '@wordpress/data';

const PostParent = ( { attributes, setAttributes } ) => {
	const { postParent, postType } = attributes;
	const { isHierarchical } = useSelect( ( select ) => {
		const { getPostType } = select( 'core' );
		const _postType = getPostType( postType );
		return {
			isHierarchical: !! _postType?.hierarchical,
		};
	} );
	const handleOnChange = ( newValue ) => {
		setAttributes( {
			taxonomy: undefined,
			termSlug: undefined,
			postIn: undefined,
			postNameIn: undefined,
			postParent: newValue,
		} );
	};
	return (
		<>
			{ isHierarchical && (
				<BaseControl>
					<PostParentSelect
						label={ __( '親ページ指定', 'ystandard-toolbox' ) }
						postType={ postType }
						value={ postParent }
						onChange={ handleOnChange }
					/>
				</BaseControl>
			) }
		</>
	);
};
export default PostParent;
