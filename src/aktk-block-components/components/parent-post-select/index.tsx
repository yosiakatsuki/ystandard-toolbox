/* WordPress Dependencies */
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/* Aktk Dependencies */
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';

import type { ParentPostSelectProps, PostRecord } from './types';
import { buildParentPostOptions } from './utils';

/**
 * 親投稿選択コンポーネント
 *
 * 階層型投稿タイプにおいて、子ページを持つ投稿を一覧取得し、親投稿として選択できるコンポーネント。
 * postTypeが未指定・空文字、または非階層型の場合はデータ取得を行わず、空選択肢のみ表示する。
 * @param props
 */
export function ParentPostSelect( props: ParentPostSelectProps ) {
	const {
		value,
		onChange,
		postType,
		label,
		useEmptyValue = true,
		emptyLabel,
		noOptionsLabel,
		disabled = false,
	} = props;

	const hasPostType = !! postType;

	// 階層型判定と投稿一覧の取得
	const posts = useSelect(
		( select ) => {
			if ( ! hasPostType ) {
				return [];
			}
			const store = select( coreStore );
			// @ts-ignore -- getPostType の型定義が不完全なため
			const postTypeInfo = store.getPostType( postType );
			if ( ! postTypeInfo?.hierarchical ) {
				return [];
			}
			// @ts-ignore -- getEntityRecords の型定義が不完全なため
			const records: PostRecord[] | null = store.getEntityRecords(
				'postType',
				postType,
				{ per_page: -1 }
			);
			return records ?? [];
		},
		[ postType, hasPostType ]
	);

	// 親投稿の選択肢を生成
	const options = useMemo( () => {
		return buildParentPostOptions( posts );
	}, [ posts ] );

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
