/* WordPress Dependencies */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/* Plugin Dependencies */
import { InspectorControls } from './inspector-controls';
import { getStickyColumnsClasses } from './utils';
import type { StickyColumnsEditProps } from './types';
import './style-editor.scss';

const template: [ string, Record< string, unknown > ][] = [
	[ 'ystdtb/sticky-columns-item', {} ],
	[ 'ystdtb/sticky-columns-item', {} ],
];

/**
 * 直下のカラム2個を固定し、同じ要素をレイアウトの親にする。
 * @param props 親ブロックの編集プロパティ。
 */
export default function StickyColumnsEdit( props: StickyColumnsEditProps ) {
	const blockProps = useBlockProps( {
		className: getStickyColumnsClasses( props.attributes ),
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: [ 'ystdtb/sticky-columns-item' ],
		template,
		templateLock: 'all',
		renderAppender: false,
	} );

	return (
		<>
			<InspectorControls { ...props } />
			<div { ...innerBlocksProps } />
		</>
	);
}
