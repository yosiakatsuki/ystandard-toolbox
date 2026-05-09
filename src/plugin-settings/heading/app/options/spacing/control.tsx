/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk dependencies
 */
import {
	CustomSpacingSelectControl,
	type ResponsiveSpacing,
} from '@aktk/block-components/components/custom-spacing-select';
import { ResponsiveControlGrid } from '@aktk/block-components/components/tab-panel';
import type { SpacingSizeValues } from '@aktk/block-components/wp-controls/spacing-size-control';

const SPACING_KEYS = [ 'top', 'right', 'bottom', 'left' ] as const;

function getSpacingValue( value: SpacingSizeValues | undefined ) {
	if ( ! value ) {
		return undefined;
	}
	return SPACING_KEYS.reduce< SpacingSizeValues >( ( result, key ) => {
		if ( value.hasOwnProperty( key ) ) {
			result[ key ] = value[ key ];
		}
		return result;
	}, {} );
}

export function DefaultSpacingEdit( props: {
	value: SpacingSizeValues | undefined;
	onChange: ( newValue: SpacingSizeValues | undefined ) => void;
	spacingSizes: object[];
	label: string;
	minimumCustomValue?: number;
} ) {
	const {
		value,
		onChange,
		spacingSizes,
		label,
		minimumCustomValue = 0,
	} = props;
	return (
		<CustomSpacingSelectControl.CustomValue
			label={ label }
			values={ getSpacingValue( value ) }
			onChange={ onChange }
			spacingSizes={ spacingSizes }
			minimumCustomValue={ minimumCustomValue }
		/>
	);
}

export function ResponsiveSpacingEdit( props: {
	value: ResponsiveSpacing;
	onChange: ( newValue: ResponsiveSpacing ) => void;
	spacingSizes: object[];
	minimumCustomValue?: number;
} ) {
	const { value, onChange, spacingSizes, minimumCustomValue = 0 } = props;
	const handleOnChange = ( newValue: ResponsiveSpacing ) => {
		onChange( {
			...value,
			...newValue,
		} );
	};
	return (
		<ResponsiveControlGrid customClassName={ { 'md:grid-cols-3': false } }>
			<div>
				<CustomSpacingSelectControl.CustomValue
					label={ __( 'デスクトップ', 'ystandard-toolbox' ) }
					values={ getSpacingValue( value?.desktop ) }
					onChange={ ( newValue: SpacingSizeValues ) => {
						handleOnChange( { desktop: newValue } );
					} }
					spacingSizes={ spacingSizes }
					minimumCustomValue={ minimumCustomValue }
				/>
			</div>
			<div>
				<CustomSpacingSelectControl.CustomValue
					label={ __( 'タブレット', 'ystandard-toolbox' ) }
					values={ getSpacingValue( value?.tablet ) }
					onChange={ ( newValue: SpacingSizeValues ) => {
						handleOnChange( { tablet: newValue } );
					} }
					spacingSizes={ spacingSizes }
					minimumCustomValue={ minimumCustomValue }
				/>
			</div>
			<div>
				<CustomSpacingSelectControl.CustomValue
					label={ __( 'スマートフォン', 'ystandard-toolbox' ) }
					values={ getSpacingValue( value?.mobile ) }
					onChange={ ( newValue: SpacingSizeValues ) => {
						handleOnChange( { mobile: newValue } );
					} }
					spacingSizes={ spacingSizes }
					minimumCustomValue={ minimumCustomValue }
				/>
			</div>
		</ResponsiveControlGrid>
	);
}
