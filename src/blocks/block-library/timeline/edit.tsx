/**
 * WordPress
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Block Dependencies.
 */
import type { TimeLineProps } from './types';
import { getTimelineClasses } from './utils';
import { InspectorControls } from '@aktk/blocks/block-library/timeline/inspector-controls';

const ALLOWED_BLOCKS = [ 'ystdtb/timeline-item' ];

const TEMPLATE = [
	[ 'ystdtb/timeline-item', {} ],
	[ 'ystdtb/timeline-item', {} ],
];

export default function Edit( props: TimeLineProps ) {
	const { clientId } = props;

	// 子ブロックの属性を更新
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	const { innerBlockClientIds, firstChildAttributes } = useSelect(
		( select ) => {
			// @ts-ignore
			const { getBlockOrder, getBlockAttributes } =
				select( 'core/block-editor' );
			// @ts-ignore
			const clientIds = getBlockOrder( clientId );
			// 最初の子ブロックの属性を取得
			const firstChild =
				clientIds && clientIds.length > 0
					? // @ts-ignore
					  getBlockAttributes( clientIds[ 0 ] )
					: undefined;

			return {
				innerBlockClientIds: clientIds,
				firstChildAttributes: firstChild,
			};
		},
		[ clientId ]
	);

	/**
	 * 子ブロックの属性を一括更新
	 * @param childAttributes
	 */
	const updateChildAttributes = (
		childAttributes: Record< string, any >
	) => {
		// @ts-ignore.
		innerBlockClientIds.forEach( ( innerBlockClientId ) => {
			updateBlockAttributes( innerBlockClientId, childAttributes );
		} );
	};

	const blockProps = useBlockProps( {
		className: getTimelineClasses(),
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		// @ts-ignore
		template: TEMPLATE,
	} );

	const inspectorControlsProps = {
		...props,
		updateChildAttributes,
		firstChildAttributes,
	};

	return (
		<>
			<InspectorControls { ...inspectorControlsProps } />
			<div { ...innerBlocksProps } />
		</>
	);
}
