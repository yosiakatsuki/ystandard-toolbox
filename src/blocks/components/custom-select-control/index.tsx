import classnames from 'classnames';
/**
 * WordPress
 */
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { CustomSelectControl as WPCustomSelectControl } from '@wordpress/components';
/**
 * Component.
 */
import './_index.scss';

/**
 * @deprecated
 */
export interface CustomSelectControlOption {
	key: string;
	name: string;
	style: React.CSSProperties;
}

/**
 * @deprecated
 */
export interface CustomSelectControlProps {
	value: string;
	options: CustomSelectControlOption[];
	onChange: ( value: string ) => void;
	isHorizon?: string;
	label?: string;
	deleteEmpty?: boolean;
	className?: string;
}

/**
 * @param root0
 * @param root0.value
 * @param root0.options
 * @param root0.onChange
 * @param root0.isHorizon
 * @param root0.label
 * @param root0.deleteEmpty
 * @deprecated
 */
const CustomSelectControl = ( {
	value,
	options,
	onChange,
	isHorizon,
	label = undefined,
	deleteEmpty = false,
	...props
}: CustomSelectControlProps ) => {
	const selectOptions = useMemo( () => {
		let defaultItem = [
			{
				key: '',
				name: __( '--選択してください--', 'ystandard-toolbox' ),
			},
		];
		if ( true === deleteEmpty ) {
			defaultItem = [];
		}
		return [ ...defaultItem, ...options ] as CustomSelectControlOption[];
	}, [ options ] );

	const className = classnames( 'aktk-custom-select-control', {
		'is-horizon': isHorizon,
	} );
	const handleOnChange = ( {
		selectedItem,
	}: {
		selectedItem: CustomSelectControlOption;
	} ) => {
		onChange( selectedItem.key );
	};
	const currentSelection = selectOptions.find( ( option ) => {
		return option.key === value;
	} );
	return (
		<>
			{ /* @ts-ignore */ }
			<WPCustomSelectControl
				className={ className }
				label={ label || '' }
				options={ selectOptions }
				value={ currentSelection }
				// @ts-ignore
				onChange={ handleOnChange }
				__nextUnconstrainedWidth={ true }
				{ ...props }
			/>
		</>
	);
};
export default CustomSelectControl;
