/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

/**
 * Block dependencies.
 */
import type { PostsEditProps } from '../../types';
import { PostTypeSelect } from '@aktk/block-components/components/post-type-select';

export function PostType( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { postType } = attributes;

	const onChangePostType = ( value: string ) => {
		setAttributes( {
			postType: value,
			taxonomy: undefined,
			termSlug: undefined,
		} );
	};
	return (
		<BaseControl
			id={ 'post-type' }
			label={ __( '投稿タイプ', 'ystandard-toolbox' ) }
		>
			<PostTypeSelect
				value={ postType }
				onChange={ onChangePostType }
				excludeSlugs={ [ 'attachment', 'ys-parts' ] }
				useEmptyValue={ false }
				noOptionsLabel={ __(
					'選択できる投稿タイプがありません',
					'ystandard-toolbox'
				) }
			/>
		</BaseControl>
	);
}
