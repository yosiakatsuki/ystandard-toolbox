/* WordPress Dependencies */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';

/* Plugin Dependencies */
import { getItemSizeVariables, type ColumnItemAttributes } from './dimensions';

/**
 * 本文用ラッパーを挟まず、カラムと通常ブロックを保存する。
 * @param props ブロックまたはパネルのプロパティ。
 */
export default function StickyColumnsItemSave(
	props: BlockSaveProps< ColumnItemAttributes >
) {
	const { attributes } = props;
	const blockProps = useBlockProps.save( {
		className: 'ystdtb-sticky-columns-item',
		style: getItemSizeVariables( attributes ),
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
