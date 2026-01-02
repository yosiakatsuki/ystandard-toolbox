/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';
/**
 * Block Dependencies.
 */
import type { DlColumnBlockProps } from '../types';
import { StackOn } from './stack-on';
import { Size } from './size';
import { Border } from './border';
import { Spacing } from './spacing';

export function InspectorControls( props: DlColumnBlockProps ) {
	return (
		<WPInspectorControls>
			<StackOn { ...props } />
			<Size { ...props } />
			<Border { ...props } />
			<Spacing { ...props } />
		</WPInspectorControls>
	);
}
