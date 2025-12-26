/**
 * WordPress
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
/**
 * Block dependencies.
 */
import type { DdBoxBlockProps } from './types';
import { getDdBoxBlockClasses, getDdBoxBlockStyles } from './utils';

export default function Save( props: DdBoxBlockProps ): JSX.Element {
	const { attributes } = props;
	const blockProps = useBlockProps.save( {
		className: getDdBoxBlockClasses( attributes ),
		style: getDdBoxBlockStyles( attributes ),
	} );
	return (
		<dd { ...blockProps }>
			<InnerBlocks.Content />
		</dd>
	);
}
