/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import { Panel } from '@aktk/block-components/components/panel';

/* Plugin Dependencies */
import type { StickyColumnsEditProps } from '../../types';
import { Preview } from './preview';
import { DisplayOrder } from './display-order';
import { StickyColumn } from './sticky-column';
import './style-editor.scss';

/**
 * 表示順パネルにプレビューと個別の設定をまとめる。
 * @param props 親ブロックの編集プロパティ。
 */
export function ColumnOrder( props: StickyColumnsEditProps ) {
	return (
		<Panel title={ __( '表示順', 'ystandard-toolbox' ) }>
			<div className="ystdtb-sticky-columns-edit__column-order">
				<Preview { ...props } />
				<DisplayOrder { ...props } />
				<StickyColumn { ...props } />
			</div>
		</Panel>
	);
}
