/**
 * WordPress dependencies
 */
import { BlockControls as WPBlockControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import type { SliderEditProps } from '../types';
import { PreviewType } from './preview-type';

export function BlockControls( props: SliderEditProps ): JSX.Element {
	return (
		<WPBlockControls>
			<PreviewType { ...props } />
		</WPBlockControls>
	);
}
