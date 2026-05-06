/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';
import { normalizeSizeValue } from '@aktk/block-components/utils/size';

// @ts-ignore.
export function LabelBorderRadius( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { labelBorderRadius } = attributes;

	const handleOnChange = ( value: string ) => {
		setAttributes( { labelBorderRadius: normalizeSizeValue( value ) } );
	};
	return (
		<BaseControl
			id="faq-item-label-border-radius"
			label={ __( 'ラベル角丸', 'ystandard-toolbox' ) }
		>
			<UnitControl
				value={ labelBorderRadius }
				onChange={ handleOnChange }
				min={0}
			/>
		</BaseControl>
	);
}
