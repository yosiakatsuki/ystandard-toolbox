/**
 * WordPress Dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import { ToggleGroup } from '@aktk/block-components/components/toggle-group';
import BaseControl from '@aktk/block-components/wp-controls/base-control';

/**
 * Plugin Dependencies
 */
import type { PostMeta, PostSettingsItemProps } from '../types';

export const OVERLAY_META_KEY = 'ystdtb-overlay';

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
 * ヘッダーオーバーレイ設定を表示する.
 *
 * @param props          投稿設定項目props.
 * @param props.postType
 * @param props.postId
 */
export default function HeaderOverlaySetting( {
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
	const rawValue = postMeta[ OVERLAY_META_KEY ];
	const value =
		typeof rawValue === 'string' &&
		[ 'none', 'on', 'off' ].includes( rawValue )
			? rawValue
			: 'none';
	const label = __( 'ヘッダーオーバーレイ', 'ystandard-toolbox' );
	// オーバーレイ設定だけを更新し、ほかの投稿メタを保持する.
	const updateValue = ( nextValue: string ) => {
		setMeta( {
			...postMeta,
			[ OVERLAY_META_KEY ]: nextValue,
		} );
	};

	return (
		<BaseControl
			help={ __(
				'「-」を選択した場合、ヘッダーオーバーレイの「詳細ページ」設定に従います。',
				'ystandard-toolbox'
			) }
		>
			<ToggleGroup
				label={ label }
				value={ value }
				onChange={ ( nextValue ) => updateValue( nextValue as string ) }
				options={ [
					{
						label: '-',
						value: 'none',
					},
					{
						label: __( '有効', 'ystandard-toolbox' ),
						value: 'on',
					},
					{
						label: __( '無効', 'ystandard-toolbox' ),
						value: 'off',
					},
				] }
				isBlock
			/>
		</BaseControl>
	);
}
