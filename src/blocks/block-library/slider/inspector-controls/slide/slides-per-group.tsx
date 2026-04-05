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

export function SlidesPerGroup( props: SlideOptionEditProps ) {
	const { value, onChange, type } = props;
	const { slidesPerGroup } = value || {};

	const handleOnChange = ( newValue?: number | string ) => {
		const _newValue =
			undefined === newValue || '' === newValue
				? undefined
				: Number( newValue );
		onChange( { slidesPerGroup: _newValue } );
	};

	return (
		<BaseControl
			id={ `slide-${ type }-slidesPerGroup` }
			label={ __( 'グループ化するスライド数', 'ystandard-toolbox' ) }
		>
			<NumberControl
				value={ slidesPerGroup || '' }
				onChange={ handleOnChange }
				min={ 0 }
				step={ 1 }
			/>
		</BaseControl>
	);
}
