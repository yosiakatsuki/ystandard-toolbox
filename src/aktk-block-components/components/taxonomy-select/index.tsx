/* WordPress Dependencies */
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/* Aktk Dependencies */
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';

import type { TaxonomySelectProps, TaxonomyRecord } from './types';

/**
 * タクソノミー選択コンポーネント
 *
 * 指定した投稿タイプに紐づくタクソノミー一覧を取得し、セレクトUIで選択できるコンポーネント。
 * postTypeが未指定・空文字の場合はデータ取得を行わず、空選択肢のみ表示する。
 * @param props
 */
export function TaxonomySelect( props: TaxonomySelectProps ) {
	const {
		value,
		onChange,
		postType,
		label,
		excludeSlugs = [],
		filter,
		useEmptyValue = true,
		emptyLabel,
		noOptionsLabel,
		disabled = false,
	} = props;

	const hasPostType = !! postType;

	// タクソノミー一覧を取得
	const taxonomies = useSelect(
		( select ) => {
			if ( ! hasPostType ) {
				return [];
			}
			// @ts-ignore -- getTaxonomies の型定義が不完全なため
			const types: TaxonomyRecord[] | null =
				select( coreStore ).getTaxonomies( {
					type: postType,
					per_page: -1,
				} );
			return types ?? [];
		},
		[ postType, hasPostType ]
	);

	// フィルタリングしてオプション形式に変換
	const options = useMemo( () => {
		let filtered = taxonomies.filter( ( taxonomy ) => {
			// 除外スラッグに該当するタクソノミーを除外
			return ! excludeSlugs.includes( taxonomy.slug );
		} );

		// カスタムフィルタの適用
		if ( filter ) {
			filtered = filtered.filter( filter );
		}

		return filtered.map( ( taxonomy ) => ( {
			key: taxonomy.slug,
			name: taxonomy.name,
		} ) );
	}, [ taxonomies, excludeSlugs, filter ] );

	// 選択肢がない場合はnoOptionsLabelを空選択肢ラベルとして使用
	const resolvedEmptyLabel =
		options.length === 0 && noOptionsLabel ? noOptionsLabel : emptyLabel;

	return (
		<CustomSelectControl
			label={ label }
			options={ options }
			value={ value }
			onChange={ onChange }
			useEmptyValue={ useEmptyValue }
			emptyLabel={ resolvedEmptyLabel }
			disabled={ disabled }
		/>
	);
}
