/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import NumberControl from '@aktk/block-components/wp-controls/number-control';
import { NoticeSecondary } from '@aktk/block-components/components/notice';
import { toInt } from '@aktk/block-components/utils/number';

/**
 * Block dependencies.
 */
import type { PostsEditProps } from '../../types';
import { isAllSimpleDesign, isAnySimpleDesign } from '../../utils';

export function ExcerptLines( props: PostsEditProps ) {
	const { attributes, setAttributes } = props;
	const { excerptLines, showExcerpt } = attributes;
	const allSimple = isAllSimpleDesign( attributes );
	const anySimple = isAnySimpleDesign( attributes );

	if ( ! showExcerpt || allSimple ) {
		return null;
	}

	return (
		<BaseControl>
			<NumberControl
				value={ excerptLines }
				label={ __( '概要文の最大行数', 'ystandard-toolbox' ) }
				onChange={ ( value ) =>
					setAttributes( { excerptLines: toInt( value ) } )
				}
				min={ 0 }
			/>
			{ anySimple && (
				<NoticeSecondary>
					{ __(
						'シンプルデザインでは概要文は表示されません。',
						'ystandard-toolbox'
					) }
				</NoticeSecondary>
			) }
		</BaseControl>
	);
}
