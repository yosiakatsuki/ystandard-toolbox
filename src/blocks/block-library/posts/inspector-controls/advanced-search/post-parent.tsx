/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ParentPostSelect } from '@aktk/block-components/components/parent-post-select';

/**
 * Block dependencies.
 */
import type { PostsEditProps } from '../../types';

export function PostParent( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { postParent, postType } = attributes;

	// 階層型判定
	const isHierarchical = useSelect(
		( select ) => {
			// @ts-ignore -- getPostType の型定義が不完全なため
			const postTypeInfo = select( coreStore ).getPostType( postType );
			return !! postTypeInfo?.hierarchical;
		},
		[ postType ]
	);

	if ( ! isHierarchical ) {
		return null;
	}

	const handleOnChange = ( value: string ) => {
		setAttributes( {
			taxonomy: undefined,
			termSlug: undefined,
			postIn: undefined,
			postNameIn: undefined,
			postParent: value,
		} );
	};

	return (
		<BaseControl
			id={ 'post-parent' }
			label={ __( '親ページ指定', 'ystandard-toolbox' ) }
		>
			<ParentPostSelect
				postType={ postType }
				value={ postParent ?? '' }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
