import { __ } from '@wordpress/i18n';
import { BaseControl, TextControl } from '@wordpress/components';

const PostId = ( { attributes, setAttributes } ) => {
	const { postIn } = attributes;
	const handleOnChange = ( newValue ) => {
		setAttributes( {
			taxonomy: undefined,
			termSlug: undefined,
			postIn: newValue,
			postNameIn: undefined,
			postParent: undefined,
		} );
	};
	return (
		<BaseControl>
			<TextControl
				label={ __( '投稿ID指定', 'ystandard-toolbox' ) }
				value={ postIn }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default PostId;
