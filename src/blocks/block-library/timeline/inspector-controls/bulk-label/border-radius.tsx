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

export function BorderRadius( props: TimeLineInspectorProps ): JSX.Element {
	const { updateChildAttributes, firstChildAttributes } = props;

	const initialValue = firstChildAttributes?.labelBorderRadius;

	const [ labelBorderRadius, setLabelBorderRadius ] = useState<
		string | undefined
	>( initialValue );
	// 変更時処理.
	const handleOnChange = ( value: string ) => {
		const _value = '' === value ? undefined : ( value as string );
		updateChildAttributes( {
			labelBorderRadius: _value,
		} );
		setLabelBorderRadius( _value );
	};

	return (
		<BaseControl
			id="border-radius"
			label={ __( 'ラベル角丸', 'ystandard-toolbox' ) }
		>
			<UnitControl
				value={ labelBorderRadius }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
