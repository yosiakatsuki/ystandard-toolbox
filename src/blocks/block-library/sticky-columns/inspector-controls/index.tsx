/* WordPress Dependencies */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/* Plugin Dependencies */
import type { StickyColumnsEditProps } from '../types';
import { Collapse } from './collapse';
import { ColumnOrder } from './column-order';
import { StickySettings } from './sticky';
import { ResponsiveSpacing } from './styles/responsive-spacing';

/**
 * 親カラムのパネルを設定タブとスタイルタブに配置する。
 * @param props 親ブロックの編集プロパティ。
 */
export function InspectorControls( props: StickyColumnsEditProps ) {
	return (
		<>
			<WPInspectorControls group="settings">
				<ColumnOrder { ...props } />
				<StickySettings { ...props } />
				<Collapse { ...props } />
			</WPInspectorControls>
			<WPInspectorControls group="styles">
				<ResponsiveSpacing { ...props } />
			</WPInspectorControls>
		</>
	);
}
