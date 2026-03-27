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
import { isAllSimpleDesign } from '../../utils';

export function Excerpt( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { showExcerpt } = attributes;
	const allSimple = isAllSimpleDesign( attributes );

	return (
		<>
			{ allSimple ? (
				<BaseControl id="show-excerpt" label={ __( '概要文', 'ystandard-toolbox' ) }>
					<NoticeSecondary>
						{ __(
							'シンプルデザインでは概要文は表示されません。',
							'ystandard-toolbox'
						) }
					</NoticeSecondary>
				</BaseControl>
			) : (
				<BaseControl>
					<ToggleControl
						label={ __( '概要文を表示する', 'ystandard-toolbox' ) }
						checked={ showExcerpt }
						onChange={ ( value ) =>
							setAttributes( { showExcerpt: value } )
						}
					/>
				</BaseControl>
			) }
		</>
	);
}
