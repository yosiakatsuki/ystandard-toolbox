import { __experimentalUnitControl as WPUnitControl } from '@wordpress/components';

/*
 * @deprecated
 */
const UnitControl = ( { label, value, onChange, units, ...props } ) => {
	return (
		<WPUnitControl
			label={ label }
			value={ value }
			onChange={ onChange }
			units={ units }
			{ ...props }
		/>
	);
};

/*
 * @deprecated
 */
export default UnitControl;
