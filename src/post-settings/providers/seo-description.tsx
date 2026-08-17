/**
 * WordPress Dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import TextareaControl from '@aktk/block-components/wp-controls/textarea-control';

/**
 * Plugin Dependencies
 */
import type { PostMeta, PostSettingsItemProps } from '../types';

export const SEO_DESCRIPTION_META_KEY = 'ystdtb_seo_description';

/**
 * 投稿メタがオブジェクトの場合だけ編集値として使用する.
 *
 * @param value 投稿メタ.
 */
function normalizePostMeta( value: unknown ): PostMeta {
	return value !== null && typeof value === 'object'
		? ( value as PostMeta )
		: {};
}

/**
 * SEO description設定を表示する.
 *
 * @param props          投稿設定項目props.
 * @param props.postType
 * @param props.postId
 */
export default function SeoDescriptionSetting( {
	postType,
	postId,
}: PostSettingsItemProps ) {
	const [ meta, setMeta ] = useEntityProp(
		'postType',
		postType,
		'meta',
		postId
	);
	const postMeta = normalizePostMeta( meta );
	const rawValue = postMeta[ SEO_DESCRIPTION_META_KEY ];
	const value = typeof rawValue === 'string' ? rawValue : '';
	// SEO descriptionだけを更新し、ほかの投稿メタを保持する.
	const updateValue = ( nextValue: string ) => {
		setMeta( {
			...postMeta,
			[ SEO_DESCRIPTION_META_KEY ]: nextValue,
		} );
	};

	return (
		<TextareaControl
			label={ __( 'meta description', 'ystandard-toolbox' ) }
			help={ __(
				'空白の場合、「抜粋」または投稿本文からdescriptionを自動生成します。',
				'ystandard-toolbox'
			) }
			value={ value }
			onChange={ updateValue }
			rows={ 4 }
		/>
	);
}
