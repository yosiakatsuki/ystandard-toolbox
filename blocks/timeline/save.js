import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes } ) {

	const blockProps = useBlockProps.save( {
		className: 'ystdtb-timeline',
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content/>
		</div>
	);
}
