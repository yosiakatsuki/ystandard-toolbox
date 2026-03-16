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

export function PostName( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { postNameIn } = attributes;

	const handleOnChange = ( value: string ) => {
		setAttributes( {
			taxonomy: undefined,
			termSlug: undefined,
			postIn: undefined,
			postNameIn: value,
			postParent: undefined,
		} );
	};

	return (
		<BaseControl id={ 'post-name' }>
			<TextControl
				label={ __( '投稿名指定', 'ystandard-toolbox' ) }
				value={ postNameIn ?? '' }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
