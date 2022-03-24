/**
 * WordPress
 */
import { CustomSelectControl } from '@wordpress/components';
import { __, _x } from '@wordpress/i18n';

const FONT_WEIGHTS = [
	{
		name: _x( 'デフォルト', 'font weight', 'ystandard-toolbox' ),
		key: '',
		style: { fontWeight: 'normal' },
	},
	{
		name: _x( '細字', 'font weight', 'ystandard-toolbox' ),
		key: '100',
		style: { fontWeight: 100 },
	},
	{
		name: _x( 'エクストラライト', 'font weight', 'ystandard-toolbox' ),
		key: '200',
		style: { fontWeight: 200 },
	},
	{
		name: _x( 'ライト', 'font weight', 'ystandard-toolbox' ),
		key: '300',
		style: { fontWeight: 300 },
	},
	{
		name: _x( '標準', 'font weight', 'ystandard-toolbox' ),
		key: '400',
		style: { fontWeight: 400 },
	},
	{
		name: _x( 'ミディアム', 'font weight', 'ystandard-toolbox' ),
		key: '500',
		style: { fontWeight: 500 },
	},
	{
		name: _x( 'セミボールド', 'font weight', 'ystandard-toolbox' ),
		key: '600',
		style: { fontWeight: 600 },
	},
	{
		name: _x( '太字', 'font weight', 'ystandard-toolbox' ),
		key: '700',
		style: { fontWeight: 700 },
	},
	{
		name: _x( 'エクストラボールド', 'font weight', 'ystandard-toolbox' ),
		key: '800',
		style: { fontWeight: 800 },
	},
	{
		name: _x( 'ブラック', 'font weight', 'ystandard-toolbox' ),
		key: '900',
		style: { fontWeight: 900 },
	},
];

const FontWeightControl = ( {
	value,
	onChange,
	label = undefined,
	...props
} ) => {
	const _label = label ?? __( '太さ', 'ystandard-toolbox' );
	const _value = value || '';
	const handleOnChange = ( { selectedItem } ) => {
		onChange( selectedItem.key );
	};
	const currentSelection = FONT_WEIGHTS.find( ( option ) => {
		return option.key === _value;
	} );
	return (
		<CustomSelectControl
			label={ _label }
			options={ FONT_WEIGHTS }
			value={ currentSelection }
			onChange={ handleOnChange }
			{ ...props }
		/>
	);
};
export default FontWeightControl;
