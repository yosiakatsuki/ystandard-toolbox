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

export function LabelBorderWidth( props: TimeLineInspectorProps ): JSX.Element {
	const { updateChildAttributes, firstChildAttributes } = props;
	const [ borderSize, setBorderSize ] = useState< string | undefined >(
		firstChildAttributes?.labelBorderSize
	);
	const handleOnChange = ( value: string | number | boolean ) => {
		updateChildAttributes( {
			labelBorderSize: value,
		} );
		setBorderSize( value as string );
	};
	return (
		<BaseControl
			id="label-border-width"
			label={ __( 'ラベル枠線の太さ', 'ystandard-toolbox' ) }
		>
			<UnitControl value={ borderSize } onChange={ handleOnChange } />
		</BaseControl>
	);
}
