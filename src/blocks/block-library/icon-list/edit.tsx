/*
 * WordPress Dependencies
 */
import {
	InnerBlocks,
	InspectorControls,
	withColors,
	useBlockProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';

/*
 * Block Dependencies
 */
import {
	getBlockClasses,
	getBlockStyles,
} from '@aktk/blocks/block-library/icon-list/utils';
import './style-editor.scss';

// @ts-ignore.
function Edit( props ) {
	const { attributes } = props;
	const blockProps = useBlockProps( {
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

export default Edit;
