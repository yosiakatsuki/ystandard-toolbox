/**
 * WordPress Dependencies
 */
import { __, _x } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import NumberControl from '@aktk/block-components/wp-controls/number-control';
/**
 * Block dependencies.
 */
import type { SlideOptionEditProps } from '../../types';
import { PlainButton } from '@aktk/block-components/components/buttons';
import { NoticeWarning } from '@aktk/block-components/components/notice';

export function SlidesPerView( props: SlideOptionEditProps ) {
	const { value, onChange, type } = props;
	const { slidesPerView } = value || {};

	const handleOnChangeNumber = ( newValue?: number | string ) => {
		const _newValue =
			undefined === newValue || '' === newValue
				? undefined
				: Number( newValue );
		onChange( { slidesPerView: _newValue } );
	};
	const handleOnChangeAuto = ( newValue?: boolean ) => {
		onChange( { slidesPerView: newValue ? 'auto' : undefined } );
	};

	return (
		<BaseControl
			id={ `slide-${ type }-SlidesPerView` }
			label={ __( '1画面に表示するスライド数', 'ystandard-toolbox' ) }
		>
			<div className="flex items-center gap-2 [&>*]:!my-0">
				<NumberControl
					value={
						'auto' === slidesPerView ? '' : slidesPerView || ''
					}
					onChange={ handleOnChangeNumber }
					min={ 0 }
					step={ 1 }
				/>
				<PlainButton
					onClick={ () => {
						handleOnChangeAuto( 'auto' !== slidesPerView );
					} }
					variant={
						'auto' === slidesPerView ? 'primary' : 'secondary'
					}
				>
					{ _x( 'auto', 'block/slider', 'ystandard-toolbox' ) }
				</PlainButton>
			</div>
			{ 'auto' === slidesPerView && (
				<NoticeWarning>
					{ __(
						'"auto"は上級者向け設定です。CSSスタマイズ等、ブロックの設定以外のカスタマイズを前提とした設定になります。この設定項目の使い方などについてはサポート対象外となります。',
						'ystandard-toolbox'
					) }
				</NoticeWarning>
			) }
		</BaseControl>
	);
}
