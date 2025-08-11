/*
 * WordPress Dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { getColorClassName } from '@wordpress/block-editor';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control/color-palette';
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';
import useThemeColors from '@aktk/block-components/hooks/useThemeColors';
import { getColorSetting } from '@aktk/helper/color';

// ボーダースタイル定数
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

// 型定義
interface BorderColor {
	hex?: string;
	slug?: string;
}

interface Border {
	width?: string;
	style?: string;
	color?: BorderColor;
}

// ユーティリティ関数
const isObject = ( value: any ): value is object => {
	return (
		value !== null && typeof value === 'object' && ! Array.isArray( value )
	);
};

const parseObject = ( obj: any ) => {
	if ( ! obj || typeof obj !== 'object' ) {
		return undefined;
	}
	const keys = Object.keys( obj );
	return keys.length > 0 ? obj : undefined;
};

// ボーダースタイル生成関数
export const getBorderStyle = ( border: any, position?: string ) => {
	if ( ! isObject( border ) ) {
		return undefined;
	}
	if ( ! border?.width || ! border?.color ) {
		return undefined;
	}
	const borderStyle = border?.style || 'solid';
	const property = position ? `border-${ position }` : 'border';
	if ( getBorderColorClass( border.color ) ) {
		return {
			[ `${ property }-width` ]: border.width,
			[ `${ property }-style` ]: borderStyle,
		};
	}
	return {
		[ property ]: `${ border.width } ${ borderStyle } ${ border.color?.hex }`,
	};
};

// ボーダーカラークラス生成関数
export const getBorderColorClass = ( color: any ) => {
	if ( ! isObject( color ) ) {
		return undefined;
	}

	return color?.slug
		? getColorClassName( 'border-color', color?.slug )
		: undefined;
};

// ボーダーカスタムプロパティ生成関数
export const getBorderCustomProperty = (
	border: any,
	prefix: string,
	position = ''
) => {
	const customPropertyPrefix = 'ystdtb'; // カスタムプロパティのプレフィックス
	const _position = position ? `-${ position }` : '';
	const customProperty = `${ customPropertyPrefix }-${ prefix }-border${ _position }`;
	const borderStyle = border?.style || 'solid';
	/**
	 * チェック
	 */
	if ( ! isObject( border ) ) {
		return undefined;
	}
	if ( ! border?.width || ! border?.color?.hex ) {
		return undefined;
	}

	return {
		[ `${ customProperty }` ]: `${ border.width } ${ borderStyle } ${ border.color.hex }`,
	};
};

// BorderStyleControlコンポーネント
interface BorderStyleControlProps {
	value?: string;
	onChange: ( value: string ) => void;
	label?: string;
}

const BorderStyleControl = ( {
	value,
	onChange,
	label,
}: BorderStyleControlProps ) => {
	const _label = label ?? __( 'スタイル', 'ystandard-toolbox' );
	const _value = value || 'solid';

	return (
		<CustomSelectControl
			label={ _label }
			value={ _value }
			options={ BORDER_STYLES }
			onChange={ onChange }
			useEmptyValue={ false }
		/>
	);
};

// ボーダーコントロールコンポーネント
interface BorderControlProps {
	value?: Border;
	onChange: ( value?: Border ) => void;
}

const BorderControl = ( { value, onChange }: BorderControlProps ) => {
	const _colors = useThemeColors();

	const getColorSlug = ( color: string ) => {
		const selected = _colors.filter( ( data ) => data?.color === color );
		if ( 0 < selected.length ) {
			return selected[ 0 ]?.slug;
		}
		return undefined;
	};

	const setBorder = ( border: any ) => {
		if ( ! border || ! isObject( border ) ) {
			onChange( undefined );
			return;
		}
		const result = { ...border };
		if ( ! result?.width ) {
			delete result.width;
		}
		if ( ! result?.color ) {
			delete result.color;
		}
		if ( ! result?.style ) {
			delete result.style;
		}
		onChange( parseObject( result ) );
	};

	const handleWidthOnChange = ( newValue: string ) => {
		setBorder( {
			...value,
			width: newValue || undefined,
		} );
	};

	const handleStyleOnChange = ( newValue: string ) => {
		setBorder( {
			...value,
			style: newValue || undefined,
		} );
	};

	const handleColorOnChange = ( color?: string ) => {
		console.log( { color } );
		const newColor = ! color
			? undefined
			: {
					hex: color,
					slug: getColorSlug( color ),
			  };
		setBorder( {
			...value,
			color: newColor,
		} );
	};

	return (
		<BaseControl>
			<BaseControl>
				<UnitControl
					label={ __( '太さ', 'ystandard-toolbox' ) }
					value={ value?.width }
					onChange={ handleWidthOnChange }
					units={ [ { value: 'px', label: 'px' } ] }
				/>
			</BaseControl>
			<BaseControl>
				<BorderStyleControl
					label={ __( 'スタイル', 'ystandard-toolbox' ) }
					value={ value?.style ?? 'solid' }
					onChange={ handleStyleOnChange }
				/>
			</BaseControl>
			<BaseControl
				id="border-color"
				label={ __( '枠線色', 'ystandard-toolbox' ) }
			>
				<ColorPalette
					label={ __( '枠線色', 'ystandard-toolbox' ) }
					value={ value?.color?.hex || '' }
					onChange={ handleColorOnChange }
				/>
			</BaseControl>
		</BaseControl>
	);
};

interface BorderProps {
	attributes: {
		border?: Border;
	};
	setAttributes: ( attrs: { border?: Border } ) => void;
}

const Border: React.FC< BorderProps > = ( { attributes, setAttributes } ) => {
	const { border } = attributes;
	const handleOnChange = ( value?: Border ) => {
		setAttributes( {
			border: value,
		} );
	};
	return (
		<BaseControl id="banner-border">
			<BorderControl value={ border } onChange={ handleOnChange } />
		</BaseControl>
	);
};
export default Border;
