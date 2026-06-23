/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';
/**
 * Block dependencies.
 */
import type { SlideOptionEditProps } from '../../types';

const PX_UNITS = [ { value: 'px', label: 'px' } ];

export function SpaceBetween( props: SlideOptionEditProps ) {
	const { value, onChange, type } = props;
	const { spaceBetween } = value || {};

	const handleOnChange = ( newValue?: string ) => {
		onChange( { spaceBetween: newValue || undefined } );
	};

	return (
		<BaseControl
			id={ `slide-${ type }-SpaceBetween` }
			label={ __( 'スライド間の余白', 'ystandard-toolbox' ) }
		>
			<UnitControl
				value={ spaceBetween || '' }
				onChange={ handleOnChange }
				units={ PX_UNITS }
			/>
		</BaseControl>
	);
}
