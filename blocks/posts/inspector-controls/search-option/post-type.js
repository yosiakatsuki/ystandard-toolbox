/**
 * WordPress.
 */
import { __ } from '@wordpress/i18n';
import { BaseControl } from '@wordpress/components';
import PostTypeSelect from '@aktk/components/post-type-select';

const PostType = ( { attributes, setAttributes } ) => {
	const { postType } = attributes;
	const handleOnChange = ( newValue ) => {
		setAttributes( {
			postType: newValue,
			postIn: undefined,
			postNameIn: undefined,
			postParent: undefined,
		} );
	};
	return (
		<BaseControl __nextHasNoMarginBottom>
			<PostTypeSelect
				label={ __( '投稿タイプ', 'ystandard-toolbox' ) }
				value={ postType }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default PostType;
