/**
 * WordPress dependencies.
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
/**
 * Block dependencies.
 */
import type { DlColumnBlockProps } from './types';
import { getDlColumnClasses, getDtColumnStyles } from './utils';
import { InspectorControls } from './inspector-controls';
import './style-editor.scss';

const ALLOWED_BLOCKS = [
	'ystdtb/description-list-dt',
	'ystdtb/description-list-dd-box',
];

const TEMPLATE = [
	[ 'ystdtb/description-list-dt', {} ],
	[ 'ystdtb/description-list-dd-box', {} ],
];

export default function Edit( props: DlColumnBlockProps ) {
	const { attributes } = props;
	const blockProps = useBlockProps( {
		className: getDlColumnClasses( attributes ),
		style: getDtColumnStyles( attributes ),
	} );
	// InnerBlocks Props.
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		// @ts-ignore.
		template: TEMPLATE,
		templateLock: 'all',
	} );
	return (
		<>
			<InspectorControls { ...props } />
			<div { ...innerBlocksProps } />
		</>
	);
}
