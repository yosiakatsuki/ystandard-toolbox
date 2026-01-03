/**
 * WordPress
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
/**
 * Block dependencies.
 */
import type { DlColumnBlockProps } from './types';
import { getDlColumnClasses, getDtColumnStyles } from './utils';

export default function Save( props: DlColumnBlockProps ) {
	const { attributes } = props;
	const blockProps = useBlockProps.save( {
		className: getDlColumnClasses( attributes ),
		style: getDtColumnStyles( attributes ),
	} );
	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
