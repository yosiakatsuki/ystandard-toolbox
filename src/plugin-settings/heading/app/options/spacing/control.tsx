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

export function DefaultSpacingEdit( props: {
	value: SpacingSizeValues | undefined;
	onChange: ( newValue: ResponsiveSpacing ) => void;
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
	const handleOnChange = ( newValue: SpacingSizeValues ) => {
		onChange( {
			desktop: newValue,
			tablet: undefined,
			mobile: undefined,
		} );
	};
	return (
		<CustomSpacingSelectControl.CustomValue
			label={ label }
			values={ value }
			onChange={ handleOnChange }
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
					values={ value?.desktop }
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
					values={ value?.tablet }
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
					values={ value?.mobile }
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
