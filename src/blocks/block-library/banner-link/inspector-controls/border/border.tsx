/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { getColorClassName } from '@wordpress/block-editor';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control/color-palette';
import BorderStyleControl from '@aktk/components/border-style-control';
import { getColorSlug } from '@aktk/helper/color';

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

// ボーダーコントロールコンポーネント
interface BorderControlProps {
	value?: Border;
	onChange: ( value?: Border ) => void;
}

const BorderControl = ( { value, onChange }: BorderControlProps ) => {
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
		<div className="ystdtb-component-border-control">
			<div className="ystdtb-component-border-control__columns mb-4">
				<div className="ystdtb-component-border-control__column">
					<BaseControl>
						<UnitControl
							label={ __( '太さ', 'ystandard-toolbox' ) }
							value={ value?.width }
							onChange={ handleWidthOnChange }
							units={ [ { value: 'px', label: 'px' } ] }
						/>
					</BaseControl>
				</div>
				<div className="ystdtb-component-border-control__column">
					<BaseControl>
						<BorderStyleControl
							label={ __( 'スタイル', 'ystandard-toolbox' ) }
							value={ value?.style ?? 'solid' }
							onChange={ handleStyleOnChange }
						/>
					</BaseControl>
				</div>
			</div>
			<BaseControl>
				<ColorPalette
					label={ __( '枠線色', 'ystandard-toolbox' ) }
					value={ value?.color?.hex || '' }
					onChange={ handleColorOnChange }
				/>
			</BaseControl>
		</div>
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
