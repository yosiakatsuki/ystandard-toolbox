/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';

// @ts-ignore.
export function LabelBorderRadius( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { labelBorderRadius } = attributes;

	const handleOnChange = ( value: string ) => {
		setAttributes( { labelBorderRadius: value || undefined } );
	};
	return (
		<BaseControl
			id="faq-item-label-color"
			label={ __( 'ラベル角丸', 'ystandard-toolbox' ) }
		>
			<UnitControl
				value={ labelBorderRadius }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
