/**
 * WordPress
 */
import { CustomSelectControl } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';

const FONT_STYLES = [
	{
		name: _x( 'デフォルト', 'font style', 'ystandard-toolbox' ),
		key: '',
		style: { fontStyle: 'normal' },
	},
	{
		name: _x( '標準', 'font style', 'ystandard-toolbox' ),
		key: 'normal',
		style: { fontStyle: 'normal' },
	},
	{
		name: _x( 'イタリック', 'font style', 'ystandard-toolbox' ),
		key: 'italic',
		style: { fontStyle: 'italic' },
	},
];

const FontStyleControl = ( {
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
	const currentSelection = FONT_STYLES.find( ( option ) => {
		return option.key === _value;
	} );
	return (
		<CustomSelectControl
			label={ _label }
			options={ FONT_STYLES }
			value={ currentSelection }
			onChange={ handleOnChange }
			{ ...props }
			__nextUnconstrainedWidth
		/>
	);
};
export default FontStyleControl;
