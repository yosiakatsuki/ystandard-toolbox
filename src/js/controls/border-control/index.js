import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { getColorClassName } from '@wordpress/block-editor';
/**
 * yStandard
 */
import ColorPaletteControl from '@ystd/components/color-palette-control';
import { isObject, parseObject } from '@ystd/helper/object';
import UnitControl from '@ystd/components/unit-control';
import { getColorSlug } from '@ystd/helper/color';
import BorderStyleControl from '@ystd/components/border-style-control';
import { ystdtbConfig } from '@ystd/config';

export const getBorderStyle = ( border, position = undefined ) => {
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

export const getBorderColorClass = ( color ) => {
	if ( ! isObject( color ) ) {
		return undefined;
	}

	return color?.slug
		? getColorClassName( 'border-color', color?.slug )
		: undefined;
};

export const getBorderCustomProperty = ( border, prefix, position = '' ) => {
	const customPropertyPrefix = ystdtbConfig.customPropertyPrefix;
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

const BorderControl = ( { value, onChange, id, label } ) => {
	const _id = id ?? 'border-control';
	const setBorder = ( border ) => {
		if ( ! border || ! isObject( border ) ) {
			onChange( undefined );
			return;
		}
		const result = border;
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
	const handleWidthOnChange = ( newValue ) => {
		setBorder( {
			...value,
			width: newValue || undefined,
		} );
	};
	const handleStyleOnChange = ( newValue ) => {
		setBorder( {
			...value,
			style: newValue || undefined,
		} );
	};
	const handleColorOnChange = ( color ) => {
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
		<BaseControl id={ _id } label={ label }>
			<div className="ystdtb-component-border-control">
				<div className="ystdtb-component-border-control__columns">
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
				<BaseControl
					id={ 'ystdtb-component-border-color' }
					label={ __( '色', 'ystandard-toolbox' ) }
				>
					<ColorPaletteControl
						value={ value?.color?.hex }
						onChange={ handleColorOnChange }
					/>
				</BaseControl>
			</div>
		</BaseControl>
	);
};

export default BorderControl;
