/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';
/**
 * Block Dependencies.
 */
import type { DlColumnBlockProps } from '../types';
import { StackOn } from './stack-on';

export function InspectorControls( props: DlColumnBlockProps ) {
	return (
		<WPInspectorControls>
			<StackOn { ...props } />
		</WPInspectorControls>
	);
}
