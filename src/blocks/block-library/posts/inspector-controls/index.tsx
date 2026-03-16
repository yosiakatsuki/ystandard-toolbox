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
import { Meta } from '@aktk/blocks/block-library/posts/inspector-controls/meta';
import { SearchOption } from '@aktk/blocks/block-library/posts/inspector-controls/search-option';
import { AdvancedSearch } from '@aktk/blocks/block-library/posts/inspector-controls/advanced-search';
import { AdvancedDisplay } from '@aktk/blocks/block-library/posts/inspector-controls/advanced-display';

// @ts-ignore.
export function InspectorControls( props: PostsEditProps ): JSX.Element {
	return (
		<WPInspectorControls>
			<BasicOption { ...props } />
			<DisplayOption { ...props } />
			<Thumbnail { ...props } />
			<Meta { ...props } />
			<SearchOption { ...props } />
			<AdvancedSearch { ...props } />
			<AdvancedDisplay { ...props } />
		</WPInspectorControls>
	);
}
