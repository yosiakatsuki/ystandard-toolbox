/**
 * WordPress
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Block dependencies.
 */
import type { TimeLineProps } from './types';
import { getTimelineClasses } from './utils';

export default function Save( props: TimeLineProps ) {
	// @ts-ignore.
	const { attributes } = props;

	const blockProps = useBlockProps.save( {
		className: getTimelineClasses(),
	} );
	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
