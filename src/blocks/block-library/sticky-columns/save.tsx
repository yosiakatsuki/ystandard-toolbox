/* WordPress Dependencies */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * 親の外枠と子ブロックを投稿本文へ保存する。
 */
export default function StickyColumnsSave() {
	const blockProps = useBlockProps.save( {
		className: 'ystdtb-sticky-columns',
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
