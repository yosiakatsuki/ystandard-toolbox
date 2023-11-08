/**
 * WordPress
 */
import { CustomSelectControl } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';

const BORDER_STYLES = [
	{
		name: _x( '直線', 'border style', 'ystandard-toolbox' ),
		key: 'solid',
	},
	{
		name: _x( '点線', 'border style', 'ystandard-toolbox' ),
		key: 'dotted',
	},
	{
		name: _x( '破線', 'border style', 'ystandard-toolbox' ),
		key: 'dashed',
	},
	{
		name: _x( '二重線', 'border style', 'ystandard-toolbox' ),
		key: 'double',
	},
];

const BorderStyleControl = ( {
	value,
	onChange,
	label = undefined,
	...props
} ) => {
	const _label = label ?? __( 'スタイル', 'ystandard-toolbox' );
	const _value = value || '';
	const handleOnChange = ( { selectedItem } ) => {
		onChange( selectedItem.key );
	};
	const currentSelection = BORDER_STYLES.find( ( option ) => {
		return option.key === _value;
	} );
	return (
		<CustomSelectControl
			label={ _label }
			options={ BORDER_STYLES }
			value={ currentSelection }
			onChange={ handleOnChange }
			{ ...props }
			__nextUnconstrainedWidth
		/>
	);
};
export default BorderStyleControl;
