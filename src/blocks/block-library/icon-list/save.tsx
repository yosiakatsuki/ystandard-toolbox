/*
 * WordPress Dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import { getBlockClasses, getBlockStyles } from './utils';
import type { IconListAttributes } from './types';

function Save( {
	attributes,
}: {
	attributes: IconListAttributes;
} ): JSX.Element {
	const blockProps = useBlockProps.save( {
		className: getBlockClasses( {
			...attributes,
		} ),
		style: getBlockStyles( {
			...attributes,
		} ),
	} );
	return (
		<>
			<ul { ...blockProps }>
				<InnerBlocks.Content />
			</ul>
		</>
	);
}

export default Save;
