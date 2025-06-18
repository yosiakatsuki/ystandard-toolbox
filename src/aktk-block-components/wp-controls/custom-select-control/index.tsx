/**
 * WordPress dependencies.
 */
import { CustomSelectControl as WPCustomSelectControl } from '@wordpress/components';

export interface CustomSelectControlOption {
	key: string;
	name: string;
	style?: React.CSSProperties;
}

interface CustomSelectControlProps {
	value?: CustomSelectControlOption;
	options: CustomSelectControlOption[];
	onChange: ( value: { selectedItem: CustomSelectControlOption } ) => void;
	label?: string;
	className?: string;
	disabled?: boolean;
}

export default function CustomSelectControl( props: CustomSelectControlProps ) {
	const {
		value,
		options,
		onChange,
		label,
		className = '',
		disabled = false,
	} = props;

	return (
		<WPCustomSelectControl
			label={ label }
			options={ options }
			value={ value }
			onChange={ onChange }
			className={ className }
			disabled={ disabled }
			__next40pxDefaultSize
		/>
	);
}
