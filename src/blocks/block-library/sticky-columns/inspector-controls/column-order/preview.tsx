/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import BaseControl, {
	BaseControlVisualLabel,
} from '@aktk/block-components/wp-controls/base-control';

/* Plugin Dependencies */
import type { StickyColumnsEditProps } from '../../types';

/**
 * 現在の左右順と追従対象をプレビューする。
 * @param props 親ブロックの編集プロパティ。
 */
export function Preview( props: StickyColumnsEditProps ) {
	const { reverse, stickyColumn } = props.attributes;
	const columns = [
		{ key: 'first', name: __( 'カラム1', 'ystandard-toolbox' ) },
		{ key: 'second', name: __( 'カラム2', 'ystandard-toolbox' ) },
	];
	const previewColumns = reverse ? [ ...columns ].reverse() : columns;

	return (
		<BaseControl>
			<BaseControlVisualLabel>
				{ __( 'プレビュー', 'ystandard-toolbox' ) }
			</BaseControlVisualLabel>
			<div
				className="ystdtb-sticky-columns-edit__preview"
				aria-hidden="true"
			>
				{ previewColumns.map( ( column ) => (
					<div
						className="ystdtb-sticky-columns-edit__preview-column"
						key={ column.key }
					>
						<span>{ column.name }</span>
						{ column.key === stickyColumn && (
							<span className="ystdtb-sticky-columns-edit__preview-sticky">
								{ __( '(追従)', 'ystandard-toolbox' ) }
							</span>
						) }
					</div>
				) ) }
			</div>
		</BaseControl>
	);
}
