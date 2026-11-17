/* WordPress Dependencies */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/* Plugin Dependencies */
import './style-editor.scss';

const template: [ string, Record< string, unknown > ][] = [
	[ 'ystdtb/sticky-columns-item', {} ],
	[ 'ystdtb/sticky-columns-item', {} ],
];

/**
 * 直下のカラム2個を固定し、同じ要素をレイアウトの親にする。
 */
export default function StickyColumnsEdit() {
	const blockProps = useBlockProps( { className: 'ystdtb-sticky-columns' } );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ 'ystdtb/sticky-columns-item' ],
		template,
		templateLock: 'all',
		renderAppender: false,
	} );

	return <div { ...innerBlocksProps } />;
}
