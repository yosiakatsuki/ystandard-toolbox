/**
 * WordPress
 */
import { BaseControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
/**
 * yStandard
 */
import UnitControl from '@ystd/components/unit-control';
import { ystdtbConfig } from '@ystd/config';

const LetterSpacingControl = ( { value, onChange } ) => {
	const [ currentUnit, setCurrentUnit ] = useState( 'em' );
	const units = ystdtbConfig.component.letterSpacingUnits;
	const selectedUnit = units.find( ( unit ) => currentUnit === unit.value );

	return (
		<BaseControl
			id={ 'letter-Spacing' }
			label={ __( 'letter Spacing', 'ystandard-toolbox' ) }
			__nextHasNoMarginBottom
		>
			<UnitControl
				value={ value }
				onChange={ onChange }
				units={ units }
				onUnitChange={ ( newSelectedUnit ) => {
					setCurrentUnit( newSelectedUnit );
				} }
				step={ selectedUnit?.step || 1 }
				__next40pxDefaultSize
			/>
		</BaseControl>
	);
};
export default LetterSpacingControl;
