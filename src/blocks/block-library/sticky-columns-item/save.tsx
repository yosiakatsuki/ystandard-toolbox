/* WordPress Dependencies */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * 本文用ラッパーを挟まず、カラムと通常ブロックを保存する。
 */
export default function StickyColumnsItemSave() {
	const blockProps = useBlockProps.save( {
		className: 'ystdtb-sticky-columns-item',
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
