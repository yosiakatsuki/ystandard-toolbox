/* WordPress Dependencies */
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/* Aktk Dependencies */
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';

import type { PostTypeSelectProps, PostTypeRecord } from './types';

const DEFAULT_EXCLUDE_SLUGS = [ 'attachment' ];

/**
 * 投稿タイプ選択コンポーネント
 *
 * サイト内で利用可能な投稿タイプを取得し、セレクトUIで選択できるコンポーネント。
 * フィルタや除外設定は呼び出し側で制御する。
 * @param props
 */
export function PostTypeSelect( props: PostTypeSelectProps ) {
	const {
		value,
		onChange,
		label,
		excludeSlugs = DEFAULT_EXCLUDE_SLUGS,
		filter,
		useEmptyValue = true,
		emptyLabel,
		disabled = false,
	} = props;

	// 投稿タイプ一覧を取得
	const postTypes = useSelect( ( select ) => {
		// @ts-ignore -- getPostTypes の型定義が不完全なため
		const types: PostTypeRecord[] | null = select( coreStore ).getPostTypes(
			{ per_page: -1 }
		);
		return types ?? [];
	}, [] );

	// フィルタリングしてオプション形式に変換
	const options = useMemo( () => {
		let filtered = postTypes.filter( ( type ) => {
			// viewableでない投稿タイプを除外
			if ( ! type.viewable ) {
				return false;
			}
			// 除外スラッグに該当する投稿タイプを除外
			return ! excludeSlugs.includes( type.slug );
		} );

		// カスタムフィルタの適用
		if ( filter ) {
			filtered = filtered.filter( filter );
		}

		return filtered.map( ( type ) => ( {
			key: type.slug,
			name: type.name,
		} ) );
	}, [ postTypes, excludeSlugs, filter ] );

	return (
		<CustomSelectControl
			label={ label }
			options={ options }
			value={ value }
			onChange={ onChange }
			useEmptyValue={ useEmptyValue }
			emptyLabel={ emptyLabel }
			disabled={ disabled }
		/>
	);
}
