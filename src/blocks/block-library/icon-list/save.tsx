/*
 * WordPress Dependencies
 */
import {
	InnerBlocks,
	InspectorControls,
	withColors,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	getBlockClasses,
	getBlockStyles,
} from '@aktk/blocks/block-library/icon-list/utils';

function Save( { attributes } ) {
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
				<li>アイコンブロック移行中</li>
			</ul>
		</>
	);
}

export default Save;
