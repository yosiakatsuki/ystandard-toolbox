/*
 * WordPress Dependencies
 */
import {
	useInnerBlocksProps,
	withColors,
	useBlockProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';

/*
 * Block Dependencies
 */
import type { IconListEditProps } from './types';
import { getBlockClasses, getBlockStyles } from './utils';
import { InspectorControls } from './inspector-controls';
import './style-editor.scss';

const DEFAULT_BLOCK = {
	name: 'ystdtb/icon-list-item',
};
const TEMPLATE = [ [ 'ystdtb/icon-list-item' ] ];

// @ts-ignore.
function Edit( props: IconListEditProps ): JSX.Element {
	const { attributes, iconColor } = props;
	const blockProps = useBlockProps( {
		className: getBlockClasses( {
			...attributes,
			iconColor: '',
		} ),
		style: getBlockStyles( {
			...attributes,
			iconColor: '',
			customIconColor: iconColor?.color,
		} ),
	} );
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		defaultBlock: DEFAULT_BLOCK,
		directInsert: true,
		allowedBlocks: [ 'ystdtb/icon-list-item' ],
		template: TEMPLATE,
		templateLock: false,
		templateInsertUpdatesSelection: true,
		__experimentalCaptureToolbars: true,
	} );
	return (
		<>
			<InspectorControls { ...props } />
			<ul { ...innerBlocksProps } />
		</>
	);
}

export default compose( [
	withColors( {
		iconColor: 'iconFontColor',
	} ),
] )( Edit );
