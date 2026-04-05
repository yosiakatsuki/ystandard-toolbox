/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';
import { NoticeSecondary } from '@aktk/block-components/components/notice';
/**
 * Block dependencies.
 */
import type { PostsEditProps } from '../../types';
import { isAllSimpleDesign, isAnySimpleDesign } from '../../utils';

export function ShowThumbnail( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { showImg } = attributes;
	const allSimple = isAllSimpleDesign( attributes );
	const anySimple = isAnySimpleDesign( attributes );

	return (
		<BaseControl
			id="show-thumbnail"
			label={ __( 'サムネイル表示', 'ystandard-toolbox' ) }
		>
			{ ! allSimple && (
				<ToggleControl
					label={ __( '画像を表示する', 'ystandard-toolbox' ) }
					checked={ showImg }
					onChange={ ( value ) =>
						setAttributes( { showImg: value } )
					}
				/>
			) }
			{ anySimple && (
				<NoticeSecondary>
					{ __(
						'シンプルデザインではアイキャッチ画像は表示されません。',
						'ystandard-toolbox'
					) }
				</NoticeSecondary>
			) }
		</BaseControl>
	);
}
