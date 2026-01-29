/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import type { SliderEditProps } from '../types';
// 設定.
import { Basic } from './basic';
import { Autoplay } from './autoplay';
import { Size } from './size';
import { Slide } from './slide';
import { Navigation } from './navigation';
import { Pagination } from './pagination';
import { Advanced } from './advanced';

// @ts-ignore.
export function InspectorControls( props: SliderEditProps ): JSX.Element {
	return (
		<WPInspectorControls>
			<Basic { ...props } />
			<Autoplay { ...props } />
			<Size { ...props } />
			<Slide { ...props } />
			<Navigation { ...props } />
			<Pagination { ...props } />
			<Advanced { ...props } />
		</WPInspectorControls>
	);
}
