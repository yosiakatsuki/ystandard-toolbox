import { BaseControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ColorPaletteControl from "@ystdtb/components/color-palette-control";
import { isObject, parseObject } from "@ystdtb/helper/object";
import UnitControl from "@ystdtb/components/unit-control";
import { getComponentConfig } from "@ystdtb/helper/config";

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
		setBorder( {
			...value,
			color: color || undefined
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
					value={ value?.style }
					options={ getComponentConfig( 'borderStyles' ) }
					onChange={ handleStyleOnChange }
				/>
			</BaseControl>
			<BaseControl>
				<ColorPaletteControl
					label={ __( '色', 'ystandard-toolbox' ) }
					value={ value?.color }
					onChange={ handleColorOnChange }
				/>
			</BaseControl>
		</div>
	);
}

export default BorderControl;
