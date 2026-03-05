/**
 * WordPress dependencies
 */
import { InspectorControls as WPInspectorControls } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import type { PostsEditProps } from '../types';
import { BasicOption } from '@aktk/blocks/block-library/posts/inspector-controls/basic-option';
import { DisplayOption } from '@aktk/blocks/block-library/posts/inspector-controls/display-option';
import { Thumbnail } from '@aktk/blocks/block-library/posts/inspector-controls/thumbnail';

// @ts-ignore.
export function InspectorControls( props: PostsEditProps ): JSX.Element {
	return (
		<WPInspectorControls>
			<BasicOption { ...props } />
			<DisplayOption { ...props } />
			<Thumbnail { ...props } />
		</WPInspectorControls>
	);
}
