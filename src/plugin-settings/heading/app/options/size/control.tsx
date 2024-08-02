/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk dependencies
 */
import type { ResponsiveValues } from '@aktk/block-components/types';
import { ResponsiveControlGrid } from '@aktk/block-components/components/tab-panel';
import { IconUnitControl } from '@aktk/block-components/components/icon-control';

export function DefaultSizeEdit( props: {
	value: string | undefined;
	onChange: ( newValue: ResponsiveValues ) => void;
} ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: string ) => {
		onChange( {
			desktop: newValue,
			tablet: undefined,
			mobile: undefined,
		} );
	};
	return (
		<IconUnitControl
			unitType={ 'size' }
			value={ value }
			onChange={ handleOnChange }
		/>
	);
}

export function ResponsiveSizeEdit( props: {
	value: ResponsiveValues;
	onChange: ( newValue: ResponsiveValues ) => void;
} ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: ResponsiveValues ) => {
		onChange( {
			...value,
			...newValue,
		} );
	};
	return (
		<ResponsiveControlGrid>
			<div>
				<IconUnitControl.Desktop
					unitType={ 'size' }
					value={ value?.desktop }
					onChange={ ( newValue ) => {
						handleOnChange( {
							...value,
							desktop: newValue,
						} );
					} }
				/>
			</div>
			<div>
				<IconUnitControl.Tablet
					unitType={ 'size' }
					value={ value?.tablet }
					onChange={ ( newValue ) => {
						handleOnChange( {
							...value,
							tablet: newValue,
						} );
					} }
				/>
			</div>
			<div>
				<IconUnitControl.Mobile
					unitType={ 'size' }
					value={ value?.mobile }
					onChange={ ( newValue ) => {
						handleOnChange( {
							...value,
							mobile: newValue,
						} );
					} }
				/>
			</div>
		</ResponsiveControlGrid>
	);
}
