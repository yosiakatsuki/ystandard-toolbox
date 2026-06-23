import { __experimentalNumberControl as WPNumberControl } from '@wordpress/components';

const NumberControl = ( { value, onChange, step, shiftStep, ...props } ) => {
	return (
		<WPNumberControl
			value={ value }
			onChange={ onChange }
			step={ step }
			shiftStep={ shiftStep }
			{ ...props }
			__next40pxDefaultSize
		/>
	);
};
export default NumberControl;
