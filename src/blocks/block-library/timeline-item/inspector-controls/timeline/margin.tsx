/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';
import { NoticeSecondaryText } from '@aktk/block-components/components/notice';

/**
 * Block dependencies.
 */
import type { TimeLineItemProps } from '../../types';

export function Margin( props: TimeLineItemProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { contentMarginTop } = attributes;

	const handleOnChange = ( value: string ) => {
		setAttributes( {
			contentMarginTop: value || undefined,
		} );
	};

	return (
		<BaseControl
			id="content-margin"
			label={ __( 'コンテンツ上部余白', 'ystandard-toolbox' ) }
		>
			<UnitControl
				value={ contentMarginTop }
				onChange={ handleOnChange }
			/>
			<NoticeSecondaryText>
				{ __(
					'ラベルにアイコンやテキストを使ったときにコンテンツの開始位置がずれる場合、余白を調整してください。',
					'ystandard-toolbox'
				) }
			</NoticeSecondaryText>
		</BaseControl>
	);
}
