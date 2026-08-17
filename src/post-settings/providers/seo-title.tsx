/**
 * WordPress Dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import TextControl from '@aktk/block-components/wp-controls/text-control';

/**
 * Plugin Dependencies
 */
import type { PostMeta, PostSettingsItemProps } from '../types';

export const SEO_TITLE_META_KEY = 'ystdtb_seo_title';

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
 * SEOタイトル設定を表示する.
 *
 * @param props          投稿設定項目props.
 * @param props.postType
 * @param props.postId
 */
export default function SeoTitleSetting( {
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
	const rawValue = postMeta[ SEO_TITLE_META_KEY ];
	const value = typeof rawValue === 'string' ? rawValue : '';
	// SEOタイトルだけを更新し、ほかの投稿メタを保持する.
	const updateValue = ( nextValue: string ) => {
		setMeta( {
			...postMeta,
			[ SEO_TITLE_META_KEY ]: nextValue,
		} );
	};

	return (
		<TextControl
			label={ __( '<title>タグ用タイトル', 'ystandard-toolbox' ) }
			help={ __(
				'空白の場合、投稿タイトルを使用します。',
				'ystandard-toolbox'
			) }
			value={ value }
			onChange={ updateValue }
		/>
	);
}
