import { __experimentalInputControl as WPInputControl } from '@wordpress/components';
import './_editor.scss';

const InputControl = ( { label, onChange, value, ...props } ) => {
	return (
		<WPInputControl
			className={ 'aktk-component-input-control' }
			label={ label }
			onChange={ onChange }
			value={ value }
			{ ...props }
		/>
	);
};
export default InputControl;
