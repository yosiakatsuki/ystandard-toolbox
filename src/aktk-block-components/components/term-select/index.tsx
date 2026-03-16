/* WordPress Dependencies */
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/* Aktk Dependencies */
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';

import type { TermSelectProps, TermRecord, TaxonomyRecord } from './types';
import { buildTermTree, buildTermList } from './utils';

/**
 * ターム選択コンポーネント
 *
 * 指定したタクソノミーに属するターム一覧を取得し、セレクトUIで選択できるコンポーネント。
 * 階層型タクソノミーの場合はインデント付きのツリー表示に対応する。
 * taxonomyが未指定・空文字の場合はデータ取得を行わず、空選択肢のみ表示する。
 * @param props
 */
export function TermSelect( props: TermSelectProps ) {
	const {
		value,
		onChange,
		taxonomy,
		label,
		excludeSlugs = [],
		filter,
		useEmptyValue = true,
		emptyLabel,
		noOptionsLabel,
		disabled = false,
	} = props;

	const hasTaxonomy = !! taxonomy;

	// タームとタクソノミー情報を取得
	const { terms, isHierarchical } = useSelect(
		( select ) => {
			if ( ! hasTaxonomy ) {
				return { terms: [], isHierarchical: false };
			}
			const store = select( coreStore );
			// @ts-ignore -- getEntityRecords の型定義が不完全なため
			const records: TermRecord[] | null = store.getEntityRecords(
				'taxonomy',
				taxonomy,
				{ per_page: -1 }
			);
			// @ts-ignore -- getTaxonomy の型定義が不完全なため
			const taxonomyInfo: TaxonomyRecord | undefined =
				store.getTaxonomy( taxonomy );
			return {
				terms: records ?? [],
				isHierarchical: taxonomyInfo?.hierarchical ?? false,
			};
		},
		[ taxonomy, hasTaxonomy ]
	);

	// フィルタリングしてオプション形式に変換
	const options = useMemo( () => {
		let filtered = terms;

		// 除外スラッグに該当するタームを除外
		if ( excludeSlugs.length > 0 ) {
			filtered = filtered.filter( ( term ) => {
				return ! excludeSlugs.includes( term.slug );
			} );
		}

		// カスタムフィルタの適用
		if ( filter ) {
			filtered = filtered.filter( filter );
		}

		// 階層型の場合はツリー表示、フラットの場合はそのまま変換
		if ( isHierarchical ) {
			return buildTermTree( filtered );
		}
		return buildTermList( filtered );
	}, [ terms, excludeSlugs, filter, isHierarchical ] );

	// 選択肢がない場合: noOptionsLabelを空選択肢として強制表示
	const hasNoOptions = options.length === 0 && !! noOptionsLabel;
	const resolvedEmptyLabel = hasNoOptions ? noOptionsLabel : emptyLabel;
	const resolvedUseEmptyValue = hasNoOptions ? true : useEmptyValue;

	return (
		<CustomSelectControl
			label={ label }
			options={ options }
			value={ value }
			onChange={ onChange }
			useEmptyValue={ resolvedUseEmptyValue }
			emptyLabel={ resolvedEmptyLabel }
			disabled={ disabled }
		/>
	);
}
