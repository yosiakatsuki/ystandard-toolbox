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
	const { attributes } = props;
	const { listType, listTypeMobile } = attributes;

	// PC・モバイル両方でシンプルデザインの場合は、アイキャッチ画像は表示されないため、説明文を切り替える。
	const isSimpleDesign =
		( 'simple' === listType && ! listTypeMobile ) ||
		( 'simple' === listType && 'simple' === listTypeMobile );

	return (
		<Panel title={ __( 'サムネイル', 'ystandard-toolbox' ) }>
			{ isSimpleDesign ? (
				<p>
					{ __(
						'シンプルデザインではアイキャッチ画像は表示されません。',
						'ystandard-toolbox'
					) }
				</p>
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
