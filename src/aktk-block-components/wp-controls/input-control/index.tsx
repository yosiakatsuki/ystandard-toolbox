import classNames from 'classnames';
/**
 * WordPress dependencies.
 */
import { __experimentalInputControl as WPInputControl } from '@wordpress/components';

interface InputControlProps {
	id?: string;
	label?: string;
	onChange: ( value: string | undefined ) => void;
	value: string;
	disabled?: boolean;
	labelPosition?: 'top' | 'side';
	readOnly?: boolean;
	className?: string;
	placeholder?: string;
}

export default function InputControl( props: InputControlProps ) {
	const {
		id = '',
		label,
		onChange,
		value,
		labelPosition = 'top',
		disabled = false,
		readOnly = false,
		placeholder = '',
		className = '',
	} = props;

	const classes = classNames( className, {
		'[&_input]:!bg-gray-50': readOnly,
	} );

	return (
		<WPInputControl
			id={ id }
			label={ label }
			onChange={ onChange }
			value={ value }
			labelPosition={ labelPosition }
			disabled={ disabled }
			readOnly={ readOnly }
			className={ classes }
			placeholder={ placeholder }
		/>
	);
}
