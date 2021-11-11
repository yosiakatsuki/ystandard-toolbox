import { __experimentalInputControl as WPInputControl } from '@wordpress/components';

const InputControl = ( { label, onChange, value, ...props } ) => {
	return (
		<WPInputControl
			label={ label }
			onChange={ onChange }
			value={ value }
			{ ...props }
		/>
	);
};
export default InputControl;
