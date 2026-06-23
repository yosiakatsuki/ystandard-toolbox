/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import ToggleControl from '@aktk/block-components/wp-controls/toggle-control';

/**
 * Block dependencies.
 */
import type { TimeLineInspectorProps } from '../../types';

export function LabelWeight( props: TimeLineInspectorProps ): JSX.Element {
	const { updateChildAttributes, firstChildAttributes } = props;
	const [ isBold, setIsBold ] = useState< boolean | undefined >(
		firstChildAttributes?.labelBold
	);

	const handleOnChange = ( value: boolean ) => {
		updateChildAttributes( {
			labelBold: value || undefined,
		} );
		setIsBold( value );
	};

	if ( 'text' !== firstChildAttributes?.labelType ) {
		return <></>;
	}

	return (
		<BaseControl
			id="label-weight"
			label={ __( 'ラベル太さ', 'ystandard-toolbox' ) }
		>
			<ToggleControl
				checked={ isBold }
				onChange={ handleOnChange }
				label={ __( '太字にする', 'ystandard-toolbox' ) }
			/>
		</BaseControl>
	);
}
