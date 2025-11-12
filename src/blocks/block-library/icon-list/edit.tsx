/*
 * WordPress Dependencies
 */
import {
	InnerBlocks,
	withColors,
	useBlockProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';

/*
 * Block Dependencies
 */
import { getBlockClasses, getBlockStyles } from './utils';
import { InspectorControls } from './inspector-controls';
import './style-editor.scss';

// @ts-ignore.
function Edit( props ): JSX.Element {
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
			<InspectorControls { ...props } />
			<ul { ...blockProps }>
				<li>アイコンブロック移行中</li>
			</ul>
		</>
	);
}

export default Edit;
