/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import TextControl from '@aktk/block-components/wp-controls/text-control';

/**
 * Block dependencies.
 */
import type { PostsEditProps } from '../../types';

export function PostId( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { postIn } = attributes;

	const handleOnChange = ( value: string ) => {
		setAttributes( {
			taxonomy: undefined,
			termSlug: undefined,
			postIn: value,
			postNameIn: undefined,
			postParent: undefined,
		} );
	};

	return (
		<BaseControl id={ 'post-id' }>
			<TextControl
				label={ __( '投稿ID指定', 'ystandard-toolbox' ) }
				value={ postIn ?? '' }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
