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
import type { TimeLineItemProps } from '../../types';

export function LabelBorderWidth( props: TimeLineItemProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { labelBorderSize } = attributes;

	const handleOnChange = ( value: string | number | boolean ) => {
		setAttributes( {
			labelBorderSize: value as string,
		} );
	};
	return (
		<BaseControl
			id="label-border-width"
			label={ __( 'ラベル枠線の太さ', 'ystandard-toolbox' ) }
		>
			<UnitControl
				value={ labelBorderSize }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
