/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import { Panel } from '@aktk/block-components/components/panel';

/* Plugin Dependencies */
import type { StickyColumnsEditProps } from '../../types';
import { Preview } from './preview';
import { DisplayOrder } from './display-order';
import './style-editor.scss';

/**
 * 2列のプレビューと表示順の設定をまとめる。
 * @param props 親ブロックの編集プロパティ。
 */
export function ColumnOrder( props: StickyColumnsEditProps ) {
	return (
		<Panel title={ __( '2列表示の設定', 'ystandard-toolbox' ) }>
			<div className="ystdtb-sticky-columns-edit__panel-controls">
				<Preview { ...props } />
				<DisplayOrder { ...props } />
			</div>
		</Panel>
	);
}
