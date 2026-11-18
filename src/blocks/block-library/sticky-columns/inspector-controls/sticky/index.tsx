/* WordPress Dependencies */
import { __ } from '@wordpress/i18n';

/* Aktk Dependencies */
import { Panel } from '@aktk/block-components/components/panel';

/* Plugin Dependencies */
import type { StickyColumnsEditProps } from '../../types';
import { StickyColumn } from './sticky-column';
import { StickyOffset } from './sticky-offset';

/**
 * 追従するカラムと画面上端からの距離を設定する。
 * @param props 親ブロックの編集プロパティ。
 */
export function StickySettings( props: StickyColumnsEditProps ) {
	return (
		<Panel title={ __( '追従するカラムの設定', 'ystandard-toolbox' ) }>
			<div className="ystdtb-sticky-columns-edit__panel-controls">
				<StickyColumn { ...props } />
				<StickyOffset { ...props } />
			</div>
		</Panel>
	);
}
