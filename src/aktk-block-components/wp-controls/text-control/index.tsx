/**
 * WordPress dependencies.
 */
import { TextControl as WPTextControl } from '@wordpress/components';

interface TextControlProps {
	className?: string;
	label?: string;
	value: string;
	onChange: ( value: string ) => void;
	placeholder?: string;
}

// @ts-ignore
export default function TextControl( props: TextControlProps ) {
	const { className, label, value, onChange, placeholder } = props;

	return (
		// @ts-ignore
		<WPTextControl
			className={ className }
			label={ label }
			value={ value }
			onChange={ onChange }
			placeholder={ placeholder }
			__nextHasNoMarginBottom
			__next40pxDefaultSize
		/>
	);
}
