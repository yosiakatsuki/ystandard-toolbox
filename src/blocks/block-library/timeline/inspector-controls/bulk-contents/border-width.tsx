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

export function BorderWidth( props: TimeLineInspectorProps ): JSX.Element {
	const { updateChildAttributes, firstChildAttributes } = props;
	// 初期値設定.
	const [ borderSize, setBorderSize ] = useState< string | undefined >(
		firstChildAttributes?.contentsBorderSize
	);

	const handleOnChange = ( value: string | number | boolean ) => {
		updateChildAttributes( {
			contentsBorderSize: value as string,
		} );
		setBorderSize( value as string );
	};
	return (
		<BaseControl
			id="border-width"
			label={ __( '枠線の太さ', 'ystandard-toolbox' ) }
		>
			<UnitControl
				value={ borderSize }
				onChange={ handleOnChange }
				min={ 0 }
				placeholder="2px"
			/>
		</BaseControl>
	);
}
