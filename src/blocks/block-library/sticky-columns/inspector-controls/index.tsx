/* WordPress Dependencies */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/* Plugin Dependencies */
import type { StickyColumnsEditProps } from '../types';
import { ColumnOrder } from './column-order';

/**
 * 追従カラムの操作設定を設定グループへ配置する。
 * @param props 親ブロックの編集プロパティ。
 */
export function InspectorControls( props: StickyColumnsEditProps ) {
	return (
		<WPInspectorControls group="settings">
			<ColumnOrder { ...props } />
		</WPInspectorControls>
	);
}
