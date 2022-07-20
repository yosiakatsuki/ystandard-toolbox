import classnames from 'classnames';
/**
 * WordPress
 */
import { CustomSelectControl as WPCustomSelectControl } from '@wordpress/components';
/**
 * Component.
 */
import './_index.scss';

const CustomSelectControl = ( {
	value,
	options,
	onChange,
	isHorizon,
	label = undefined,
	...props
} ) => {
	const className = classnames( 'aktk-custom-select-control', {
		'is-horizon': isHorizon,
	} );
	const handleOnChange = ( { selectedItem } ) => {
		onChange( selectedItem.key );
	};
	const currentSelection = options.find( ( option ) => {
		return option.key === value;
	} );
	return (
		<WPCustomSelectControl
			className={ className }
			label={ label }
			options={ options }
			value={ currentSelection }
			onChange={ handleOnChange }
			{ ...props }
		/>
	);
};
export default CustomSelectControl;
