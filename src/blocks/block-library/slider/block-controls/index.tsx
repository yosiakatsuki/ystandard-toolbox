/**
 * WordPress dependencies
 */
import { BlockControls as WPBlockControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import type { SliderEditProps } from '../types';
import { PreviewType } from './preview-type';
import { PreviewColumns } from './preview-columns';

export function BlockControls( props: SliderEditProps ): JSX.Element {
	return (
		<WPBlockControls>
			<PreviewType { ...props } />
			<PreviewColumns { ...props } />
		</WPBlockControls>
	);
}
