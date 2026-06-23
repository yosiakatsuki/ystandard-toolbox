/**
 * WordPress dependencies.
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * Block dependencies.
 */
import { getSliderItemBlockClasses } from './utils';

export default function Edit() {
	const blockProps = useBlockProps( {
		className: getSliderItemBlockClasses(),
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {} );

	return (
		<>
			<div { ...innerBlocksProps } />
		</>
	);
}
