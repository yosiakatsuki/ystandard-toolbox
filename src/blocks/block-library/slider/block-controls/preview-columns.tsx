/**
 * WordPress dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import { ToolbarDropdownMenu, ToolbarGroup } from '@wordpress/components';
/**
 * Block dependencies.
 */
import type { SliderEditProps } from '../types';

// グリッドプレビューで選択できる列数
const PREVIEW_COLUMNS = [ 2, 3, 4, 5 ];

/**
 * グリッドプレビューの表示列数を選択するツールバー
 *
 * @param props ブロックのeditプロパティ.
 *
 * @return ツールバー. グリッドプレビュー以外では表示しない.
 */
export function PreviewColumns( props: SliderEditProps ) {
	const { attributes, setAttributes } = props;
	const { previewType = 'grid', previewColumns = 2 } = attributes;

	// 横並びプレビューでは列数の指定が効かないため、選択肢を表示しない
	if ( 'grid' !== previewType ) {
		return null;
	}

	const controls = PREVIEW_COLUMNS.map( ( columns ) => {
		return {
			/* translators: %d: 列数 */
			title: sprintf( __( '%d列', 'ystandard-toolbox' ), columns ),
			isActive: columns === previewColumns,
			onClick: () => {
				setAttributes( { previewColumns: columns } );
			},
		};
	} );

	return (
		<ToolbarGroup>
			<ToolbarDropdownMenu
				icon={ null }
				text={ __( 'プレビュー列数', 'ystandard-toolbox' ) }
				label={ __( 'プレビュー列数', 'ystandard-toolbox' ) }
				controls={ controls }
			/>
		</ToolbarGroup>
	);
}
