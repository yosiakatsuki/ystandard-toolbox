/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import NumberControl from '@aktk/block-components/wp-controls/number-control';
/**
 * Block dependencies.
 */
import type { SlideOptionEditProps } from '../../types';

export function SlidesPerView( props: SlideOptionEditProps ) {
	const { value, onChange, type } = props;
	const { slidesPerView } = value || {};

	const handleOnChange = ( newValue?: number | string ) => {
		const _newValue =
			undefined === newValue || '' === newValue
				? undefined
				: Number( newValue );
		onChange( { slidesPerView: _newValue } );
	};

	return (
		<BaseControl
			id={ `slide-${ type }-SlidesPerView` }
			label={ __( '1画面に表示するスライド数', 'ystandard-toolbox' ) }
		>
			<NumberControl
				value={ slidesPerView || '' }
				onChange={ handleOnChange }
				min={ 0 }
				step={ 1 }
			/>
		</BaseControl>
	);
}
