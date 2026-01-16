/**
 * WordPress dependencies
 */
import { BlockControls as WPBlockControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import type { SliderEditProps } from '../types';

export function BlockControls( props: SliderEditProps ): JSX.Element {
	return (
		<WPBlockControls>
			<></>
		</WPBlockControls>
	);
}
