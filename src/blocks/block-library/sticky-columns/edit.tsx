/* WordPress Dependencies */
import {
	store as blockEditorStore,
	useBlockProps,
	useInnerBlocksProps,
	useStyleOverride,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/* Plugin Dependencies */
import { getLayoutKey, getEditorContainerCSS } from './layout';
import { getColumnWidthVariables } from './widths';
import { getGapVariables } from './gap';
import { InspectorControls } from './inspector-controls';
import { getStickyColumnsClasses, getStickyOffsetStyle } from './utils';
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
	const key = getLayoutKey( props.attributes );
	const templateCSS = useSelect(
		( select ) =>
			select( blockEditorStore ).getSettings().ystdtbStickyColumnsQuery,
		[]
	);
	const widths = useSelect(
		( select ) => {
			const editor = select( blockEditorStore );
			return getColumnWidthVariables(
				editor
					.getBlockOrder( props.clientId )
					.map( ( id: string ) => editor.getBlockAttributes( id ) )
			);
		},
		[ props.clientId ]
	);
	useStyleOverride( { css: getEditorContainerCSS( key, templateCSS ) } );
	const blockProps = useBlockProps( {
		'data-collapse': key,
		style: {
			...widths,
			...getStickyOffsetStyle( props.attributes ),
			...getGapVariables( props.attributes ),
		},
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
