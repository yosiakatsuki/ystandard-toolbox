import classnames from 'classnames';
/**
 * WordPress dependencies.
 */
// @ts-expect-error
import { __experimentalInputControl as WPInputControl } from '@wordpress/components';
import './editor.scss';

interface InputControlProps {
	label: string;
	onChange: ( value: string ) => void;
	value: string;
	className?: string;
	disabled?: boolean;
	labelPosition?: 'top' | 'side';
}

export default function InputControl( props: InputControlProps ) {
	const { label, onChange, value } = props;
	const componentClassName = classnames(
		'aktk-component-input-control',
		props?.className
	);
	return (
		<WPInputControl
			{ ...props }
			className={ componentClassName }
			label={ label }
			onChange={ onChange }
			value={ value }
		/>
	);
}
