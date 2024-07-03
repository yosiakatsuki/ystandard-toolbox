/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * Aktk Dependencies
 */
import { BorderControl } from '@aktk/block-components/components/custom-border-select';
import type {
	FlatBorder,
	SplitBorders,
} from '@aktk/block-components/components/custom-border-select';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';
import { getFlatValue } from '@aktk/block-components/utils/responsive-value';

interface BorderProps {
	value?: SplitBorders | FlatBorder;
	onChange: ( newValue: { border: SplitBorders | FlatBorder } ) => void;
}

export default function Border( props: BorderProps ) {
	const { value, onChange } = props;

	const handleOnChange = ( newValue: SplitBorders | FlatBorder ) => {
		console.log( { newValue } );
		onChange( {
			border: newValue,
		} );
	};

	return (
		<BaseControl
			id={ 'border' }
			label={ __( '枠線', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<BorderControl
				value={
					getFlatValue( value, undefined ) as unknown as
						| SplitBorders
						| FlatBorder
				}
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
