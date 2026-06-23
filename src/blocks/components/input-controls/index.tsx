import classnames from 'classnames';
/**
 * WordPress dependencies.
 */
import { __experimentalInputControl as WPInputControl } from '@wordpress/components';
import './editor.scss';

/**
 * @deprecated
 */
interface InputControlProps {
	label: string;
	onChange: ( value: string ) => void;
	value: string;
	className?: string;
	disabled?: boolean;
	labelPosition?: 'top' | 'side';
}

/**
 * @param      props
 * @deprecated use @aktk/block-components/wp-controls/input-control
 */
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
			// @ts-ignore
			onChange={ onChange }
			value={ value }
		/>
	);
}
