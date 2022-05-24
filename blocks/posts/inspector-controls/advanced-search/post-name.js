import { __ } from '@wordpress/i18n';
import { BaseControl, TextControl } from '@wordpress/components';

const PostName = ( { attributes, setAttributes } ) => {
	const { postNameIn } = attributes;
	const handleOnChange = ( newValue ) => {
		setAttributes( {
			taxonomy: undefined,
			termSlug: undefined,
			postIn: undefined,
			postNameIn: newValue,
			postParent: undefined,
		} );
	};
	return (
		<BaseControl>
			<TextControl
				label={ __( '投稿名指定', 'ystandard-toolbox' ) }
				value={ postNameIn }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default PostName;
