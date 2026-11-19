/* WordPress Dependencies */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/* Plugin Dependencies */
import { getItemSizeVariables, type ColumnItemEditProps } from './dimensions';
import { InspectorControls } from './inspector-controls';
import './style-editor.scss';

const template: [ string, Record< string, unknown > ][] = [
	[ 'core/paragraph', {} ],
];

/**
 * 子内部のロックを解除し、通常ブロックを自由に編集できるようにする。
 * @param props ブロックまたはパネルのプロパティ。
 */
export default function StickyColumnsItemEdit( props: ColumnItemEditProps ) {
	const blockProps = useBlockProps( {
		className: 'ystdtb-sticky-columns-item',
		style: getItemSizeVariables( props.attributes ),
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template,
		templateLock: false,
	} );

	return (
		<>
			<InspectorControls { ...props } />
			<div { ...innerBlocksProps } />
		</>
	);
}
