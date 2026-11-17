/* WordPress Dependencies */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/* Plugin Dependencies */
import './style-editor.scss';

const template: [ string, Record< string, unknown > ][] = [
	[ 'core/paragraph', {} ],
];

/**
 * 子内部のロックを解除し、通常ブロックを自由に編集できるようにする。
 */
export default function StickyColumnsItemEdit() {
	const blockProps = useBlockProps( {
		className: 'ystdtb-sticky-columns-item',
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template,
		templateLock: false,
	} );

	return <div { ...innerBlocksProps } />;
}
