import { __experimentalUnitControl as WPUnitControl } from '@wordpress/components';

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

export default UnitControl;
