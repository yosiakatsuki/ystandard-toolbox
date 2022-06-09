import { BaseControl, RangeControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import HorizonButtons from '@aktk/components/horizon-buttons';
import { getComponentConfig } from '@aktk/helper/config';
import UnitControl from '@aktk/components/unit-control';
import ColorPaletteControl from '@aktk/components/color-palette-control';
import { hex2rgb } from '@aktk/helper/color';

export const getBoxShadowStyle = ( value ) => {
	if (
		undefined === value?.offsetX ||
		undefined === value?.offsetY ||
		undefined === value?.blurRadius
	) {
		return undefined;
	}
	const color = hex2rgb( value?.color ?? '#000' );
	const opacity = value?.opacity ?? 0.7;

	return {
		boxShadow: `${ value?.offsetX } ${ value?.offsetY } ${ value?.blurRadius } rgba(${ color[ 0 ] },${ color[ 1 ] },${ color[ 2 ] },${ opacity })`,
	};
};

const BoxShadowControl = ( { label = undefined, value, onChange } ) => {
	const units = [ { value: 'px', label: 'px' } ];
	const _label = label ?? __( '影', 'ystandard-toolbox' );

	const setNewValue = ( newValue ) => {
		onChange( {
			...value,
			...newValue,
		} );
	};

	const handleResetOnClick = () => {
		onChange( undefined );
	};
	const handlePresetOnChange = ( preset ) => {
		onChange( preset?.value );
	};
	const handleColorOnChange = ( color ) => {
		setNewValue( { color } );
	};
	const handleOpacityOnChange = ( newValue ) => {
		setNewValue( { opacity: newValue } );
	};
	const handleOffsetXOnChange = ( newValue ) => {
		setNewValue( { offsetX: newValue } );
	};
	const handleOffsetYOnChange = ( newValue ) => {
		setNewValue( { offsetY: newValue } );
	};
	const handleBlurRadiusOnChange = ( newValue ) => {
		setNewValue( { blurRadius: newValue } );
	};

	return (
		<BaseControl>
			<div className="ystdtb-box-shadow-control">
				<div className="ystdtb-box-shadow-control__header">
					<div className="ystdtb-box-shadow-control__label">
						{ _label }
					</div>
					<div className="ystdtb-box-shadow-control__reset">
						<Button
							isSmall
							isSecondary
							onClick={ handleResetOnClick }
						>
							{ __( 'クリア', 'ystandard-toolbox' ) }
						</Button>
					</div>
				</div>
				<div className="ystdtb-box-shadow-control__preset">
					<div className="ystdtb-box-shadow-control__preset-label">
						{ __( 'プリセット', 'ystandard-toolbox' ) }
					</div>
					<HorizonButtons
						items={ getComponentConfig( 'boxShadowPreset' ) }
						onChange={ handlePresetOnChange }
					/>
				</div>
				<div className="ystdtb-box-shadow-control__color-settings">
					<div className="ystdtb-box-shadow-control__color-settings-label">
						{ __( '色', 'ystandard-toolbox' ) }
					</div>
					<ColorPaletteControl
						onChange={ handleColorOnChange }
						value={ value?.color }
					/>
					<div className="ystdtb-box-shadow-control__color-settings-opacity">
						<RangeControl
							label={ __( '不透明度', 'ystandard-toolbox' ) }
							value={ value?.opacity }
							onChange={ handleOpacityOnChange }
							max={ 1 }
							min={ 0 }
							step={ 0.1 }
						/>
					</div>
				</div>
				<div className="ystdtb-box-shadow-control__value-settings">
					<UnitControl
						label={ __( 'X方向', 'ystandard-toolbox' ) }
						value={ value?.offsetX }
						onChange={ handleOffsetXOnChange }
						units={ units }
					/>
					<UnitControl
						label={ __( 'Y方向', 'ystandard-toolbox' ) }
						value={ value?.offsetY }
						onChange={ handleOffsetYOnChange }
						units={ units }
					/>
					<UnitControl
						label={ __( 'ぼかし', 'ystandard-toolbox' ) }
						value={ value?.blurRadius }
						onChange={ handleBlurRadiusOnChange }
						units={ units }
					/>
				</div>
			</div>
		</BaseControl>
	);
};
export default BoxShadowControl;
