/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import type { SliderEditProps } from '../types';
// 設定.
import { Basic } from '@aktk/blocks/block-library/slider/inspector-controls/basic';
import { Autoplay } from '@aktk/blocks/block-library/slider/inspector-controls/autoplay';

// @ts-ignore.
export function InspectorControls( props: SliderEditProps ): JSX.Element {
	return (
		<WPInspectorControls>
			<Basic { ...props } />
			<Autoplay { ...props } />
		</WPInspectorControls>
	);
}
