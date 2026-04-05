/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';
import { NoticeSecondaryText } from '@aktk/block-components/components/notice';
import {
	DesktopControl,
	MobileControl,
} from '@aktk/block-components/components/icon-control';

/**
 * Block dependencies.
 */
import type { PostsEditProps, ThumbnailRatio } from '../../types';
import { isAllSimpleDesign } from '../../utils';

/**
 * 画像縦横比の選択肢
 */
const RATIO_OPTIONS = [
	{ key: '16-9', name: '16:9' },
	{ key: '3-2', name: '3:2' },
	{ key: '4-3', name: '4:3' },
	{ key: '1-1', name: '1:1' },
	{ key: '2-1', name: '2:1' },
	{ key: '3-1', name: '3:1' },
	{ key: '9-16', name: '9:16' },
	{ key: '4-5', name: '4:5' },
	{ key: '2-3', name: '2:3' },
];

export function ThumbnailRatio( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { thumbnailRatio, thumbnailRatioMobile, listType, listTypeMobile } =
		attributes;
	const allSimple = isAllSimpleDesign( attributes );

	if ( allSimple ) {
		return null;
	}

	return (
		<BaseControl
			id={ 'thumbnail-ratio' }
			label={ __( '画像縦横比', 'ystandard-toolbox' ) }
		>
			<DesktopControl>
				{ 'simple' === listType ? (
					<NoticeSecondaryText>
						{ __(
							'「シンプル」では画像は表示されません。',
							'ystandard-toolbox'
						) }
					</NoticeSecondaryText>
				) : (
					<CustomSelectControl
						value={ thumbnailRatio }
						options={ RATIO_OPTIONS }
						onChange={ ( value ) => {
							setAttributes( {
								thumbnailRatio: value as ThumbnailRatio,
							} );
						} }
						useEmptyValue={ false }
					/>
				) }
			</DesktopControl>
			<MobileControl>
				{ 'simple' === listTypeMobile ? (
					<NoticeSecondaryText>
						{ __(
							'「シンプル」では画像は表示されません。',
							'ystandard-toolbox'
						) }
					</NoticeSecondaryText>
				) : (
					<CustomSelectControl
						value={ thumbnailRatioMobile }
						options={ RATIO_OPTIONS }
						onChange={ ( value ) => {
							setAttributes( {
								thumbnailRatioMobile: value as ThumbnailRatio,
							} );
						} }
						emptyLabel={ '----' }
					/>
				) }
			</MobileControl>
		</BaseControl>
	);
}
