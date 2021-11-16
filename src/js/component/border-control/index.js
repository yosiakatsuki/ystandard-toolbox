import { BaseControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { getColorClassName } from '@wordpress/block-editor';
import ColorPaletteControl from "@ystdtb/components/color-palette-control";
import { isObject, parseObject } from "@ystdtb/helper/object";
import UnitControl from "@ystdtb/components/unit-control";
import { getComponentConfig } from "@ystdtb/helper/config";
import { getColorSlug } from "@ystdtb/helper/color";

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
		}
	}
	return {
		[ property ]: `${ border.width } ${ borderStyle } ${ border.color?.hex }`,
	}
}

export const getBorderColorClass = ( color ) => {
	if ( ! isObject( color ) ) {
		return undefined;
	}

	return color?.slug ? getColorClassName( 'border-color', color?.slug ) : undefined;
};

const BorderControl = ( { value, onChange } ) => {

	const setBorder = ( border ) => {
		if ( ! border || ! isObject( border ) ) {
			onChange( undefined );
			return;
		}
		let result = border;
		if ( ! result?.width ) {
			delete result.width;
		}
		if ( ! result?.color ) {
			delete result.color;
		}
		if ( ! result?.style || ( ! result?.width && ! result?.color ) ) {
			delete result.style;
		}
		console.log( { result } );
		onChange( parseObject( result ) );
	};
	const handleWidthOnChange = ( newValue ) => {
		setBorder( {
			...value,
			width: newValue || undefined,
		} );
	}
	const handleStyleOnChange = ( newValue ) => {
		setBorder( {
			...value,
			style: newValue || undefined,
		} );
	}
	const handleColorOnChange = ( color ) => {
		const newColor = ! color ? undefined : {
			hex: color,
			slug: getColorSlug( color ),
		}
		setBorder( {
			...value,
			color: newColor
		} );
	}
	return (
		<div className="ystdtb-component-border-control">
			<BaseControl>
				<UnitControl
					label={ __( '太さ', 'ystandard-toolbox' ) }
					value={ value?.width }
					onChange={ handleWidthOnChange }
					units={ [
						{ value: 'px', label: 'px' }
					] }
				/>
			</BaseControl>
			<BaseControl>
				<SelectControl
					label={ __( 'スタイル', 'ystandard-toolbox' ) }
					value={ value?.style ?? 'solid' }
					options={ getComponentConfig( 'borderStyles' ) }
					onChange={ handleStyleOnChange }
				/>
			</BaseControl>
			<BaseControl>
				<ColorPaletteControl
					label={ __( '色', 'ystandard-toolbox' ) }
					value={ value?.color?.hex }
					onChange={ handleColorOnChange }
				/>
			</BaseControl>
		</div>
	);
}

export default BorderControl;
