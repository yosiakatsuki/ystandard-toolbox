import { __experimentalUnitControl as WPUnitControl } from '@wordpress/components';

/*
 * @deprecated use aktk-block-components/wp-controls/unit-control instead
 */
const UnitControl = ( { label, value, onChange, units, ...props } ) => {
	return (
		<WPUnitControl
			label={ label }
			value={ value }
			onChange={ onChange }
			units={ units }
			{ ...props }
			__next40pxDefaultSize
		/>
	);
};

/*
 * @deprecated
 */
export default UnitControl;
