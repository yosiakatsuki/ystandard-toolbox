import { RadioControl as WPRadioControl } from '@wordpress/components';

export interface RadioControlProps {
	selected?: string;
	onChange: ( value: string ) => void;
	label?: string;
	options: Array< {
		label: string;
		value: string;
	} >;
	help?: string;
	hideLabelFromVision?: boolean;
	className?: string;
}

export default function RadioControl( props: RadioControlProps ): JSX.Element {
	const {
		selected,
		onChange,
		label,
		options,
		help,
		hideLabelFromVision,
		className,
	} = props;
	return (
		<WPRadioControl
			className={ className }
			label={ label }
			selected={ selected }
			options={ options }
			onChange={ onChange }
			help={ help }
			hideLabelFromVision={ hideLabelFromVision }
		/>
	);
}
