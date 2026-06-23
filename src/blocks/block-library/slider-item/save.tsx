/**
 * WordPress dependencies.
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Block dependencies.
 */
import { getSliderItemBlockClasses } from './utils';

export default function Save() {
	const blockProps = useBlockProps.save( {
		className: getSliderItemBlockClasses(),
	} );

	return (
		<>
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		</>
	);
}
