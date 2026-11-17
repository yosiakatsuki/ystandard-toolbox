/* WordPress Dependencies */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import type { BlockSaveProps } from '@wordpress/blocks';

/* Plugin Dependencies */
import { getStickyColumnsClasses } from './utils';
import type { StickyColumnsAttributes } from './types';

/**
 * 親の外枠と子ブロックを投稿本文へ保存する。
 * @param props 親ブロックの保存プロパティ。
 */
export default function StickyColumnsSave(
	props: BlockSaveProps< StickyColumnsAttributes >
) {
	const { attributes } = props;
	const blockProps = useBlockProps.save( {
		className: getStickyColumnsClasses( attributes ),
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
