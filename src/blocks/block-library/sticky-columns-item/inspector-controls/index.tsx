/* WordPress Dependencies */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/* Plugin Dependencies */
import type { ColumnItemEditProps } from '../dimensions';
import { ResponsiveSize } from './styles/responsive-size';

/**
 * 子カラムの寸法パネルをスタイルタブに配置する。
 * @param props 子ブロックの編集プロパティ。
 */
export function InspectorControls( props: ColumnItemEditProps ) {
	return (
		<WPInspectorControls group="styles">
			<ResponsiveSize { ...props } />
		</WPInspectorControls>
	);
}
