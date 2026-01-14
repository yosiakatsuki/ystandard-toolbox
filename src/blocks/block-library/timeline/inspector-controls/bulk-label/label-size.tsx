/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';
/**
 * Block dependencies.
 */
import type { TimeLineInspectorProps } from '../../types';

export function LabelSize( props: TimeLineInspectorProps ): JSX.Element {
	const { updateChildAttributes, firstChildAttributes } = props;
	const [ labelSize, setLabelSize ] = useState< string | undefined >(
		firstChildAttributes?.labelSize
	);

	const handleOnChange = ( value: string | number | boolean ) => {
		const _value = '' === value ? undefined : ( value as string );
		updateChildAttributes( {
			labelSize: _value,
		} );
		setLabelSize( _value );
	};
	return (
		<BaseControl
			id="label-size"
			label={ __( 'ラベルサイズ（縦・横）', 'ystandard-toolbox' ) }
		>
			<UnitControl
				value={ labelSize }
				onChange={ handleOnChange }
				min={ 0 }
			/>
		</BaseControl>
	);
}
