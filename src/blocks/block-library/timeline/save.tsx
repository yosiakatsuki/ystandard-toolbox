/**
 * WordPress
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Block dependencies.
 */
import { getTimelineClasses } from './utils';

export default function Save() {
	const blockProps = useBlockProps.save( {
		className: getTimelineClasses(),
	} );
	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
