/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import { Panel } from '@aktk/block-components/components/panel';
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { NoticeSecondary } from '@aktk/block-components/components/notice';

/**
 * Block dependencies.
 */
import type { PostsEditProps } from '../../types';
import { isAllSimpleDesign } from '../../utils';
import { ShowThumbnail } from './show-thumbnail';
import { ThumbnailSize } from './thumbnail-size';
import { ThumbnailRatio } from './thumbnail-ratio';

export function Thumbnail( props: PostsEditProps ) {
	return (
		<Panel title={ __( 'サムネイル', 'ystandard-toolbox' ) }>
			{ isAllSimpleDesign( props.attributes ) ? (
				<BaseControl id="show-thumbnail" label={ __( 'サムネイル', 'ystandard-toolbox' ) }>
					<NoticeSecondary>
						{ __(
							'シンプルデザインではアイキャッチ画像は表示されません。',
							'ystandard-toolbox'
						) }
					</NoticeSecondary>
				</BaseControl>
			) : (
				<>
					<ShowThumbnail { ...props } />
					<ThumbnailSize { ...props } />
					<ThumbnailRatio { ...props } />
				</>
			) }
		</Panel>
	);
}
