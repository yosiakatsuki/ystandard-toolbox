/**
 * WordPress
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

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
	const innerBlockClientIds = useSelect(
		( select ) => {
			// @ts-ignore
			const { getBlockOrder } = select( 'core/block-editor' );
			// @ts-ignore
			return getBlockOrder( clientId );
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
	};

	return (
		<>
			<InspectorControls { ...inspectorControlsProps } />
			<div { ...innerBlocksProps } />
		</>
	);
}
