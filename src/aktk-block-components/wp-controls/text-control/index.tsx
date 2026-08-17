/**
 * WordPress dependencies.
 */
import { TextControl as WPTextControl } from '@wordpress/components';

interface TextControlProps {
	className?: string;
	label?: string;
	help?: string;
	value: string;
	onChange: ( value: string ) => void;
	placeholder?: string;
}

// @ts-ignore
export default function TextControl( props: TextControlProps ) {
	const { className, label, help, value, onChange, placeholder } = props;

	return (
		// @ts-ignore
		<WPTextControl
			className={ className }
			label={ label }
			help={ help }
			value={ value }
			onChange={ onChange }
			placeholder={ placeholder }
			__nextHasNoMarginBottom
			__next40pxDefaultSize
		/>
	);
}
