/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { Panel } from '@aktk/block-components/components/panel';

/**
 * Block dependencies.
 */
import type { PostsEditProps } from '../../types';
import { ShowThumbnail } from './show-thumbnail';
import { ThumbnailSize } from './thumbnail-size';
import { ThumbnailRatio } from './thumbnail-ratio';

export function Thumbnail( props: PostsEditProps ) {
	return (
		<Panel title={ __( 'サムネイル', 'ystandard-toolbox' ) }>
			<ShowThumbnail { ...props } />
			<ThumbnailSize { ...props } />
			<ThumbnailRatio { ...props } />
		</Panel>
	);
}
