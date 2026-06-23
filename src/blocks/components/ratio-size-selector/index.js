import classnames from 'classnames';
import { _x } from '@wordpress/i18n';
import { CustomSelectControl as WPCustomSelectControl } from '@wordpress/components';

export const RATIO_SIZE = [
	{
		name: _x( '指定なし', 'ratio size', 'ystandard-toolbox' ),
		key: '',
	},
	{ name: '1:1', key: '1 / 1' },
	{ name: '2:1', key: '2 / 1' },
	{ name: '3:1', key: '3 / 1' },
	{ name: '3:2', key: '3 / 2' },
	{ name: '4:3', key: '4 / 3' },
	{ name: '16:9', key: '16 / 9' },
];

const RatioSizeSelector = ( {
	value,
	onChange,
	isHorizon,
	label = undefined,
	className,
	...props
} ) => {
	const _className = classnames( 'aktk-ratio-size-selector', className, {
		'is-horizon': isHorizon,
	} );
	const handleOnChange = ( { selectedItem } ) => {
		onChange( selectedItem.key );
	};
	const currentSelection = RATIO_SIZE.find( ( option ) => {
		return option.key === value;
	} );
	return (
		<WPCustomSelectControl
			className={ _className }
			label={ label }
			options={ RATIO_SIZE }
			value={ currentSelection }
			onChange={ handleOnChange }
			{ ...props }
		/>
	);
};
export default RatioSizeSelector;
