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

export function Margin( props: TimeLineInspectorProps ): JSX.Element {
	const [ marginTop, setMarginTop ] = useState< string | undefined >(
		undefined
	);
	const { updateChildAttributes } = props;
	const handleOnChange = ( value: string ) => {
		updateChildAttributes( {
			contentMarginTop: value || undefined,
		} );
		setMarginTop( value || undefined );
	};

	return (
		<BaseControl
			id="content-margin"
			label={ __( 'コンテンツ上部余白', 'ystandard-toolbox' ) }
		>
			<UnitControl value={ marginTop } onChange={ handleOnChange } />
		</BaseControl>
	);
}
