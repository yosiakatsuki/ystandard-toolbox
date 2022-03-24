/**
 * WordPress
 */
import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
/**
 * yStandard
 */
import FontWeightControl from '@ystdtb/components/font-wheight-control';
import FontStyleControl from '@ystdtb/components/font-style-control';
import NumberControl from '@ystdtb/components/number-control';
import LetterSpacingControl from '@ystdtb/controls/letter-spacing-control';

const TypographySettingsControl = ( { values, onChange } ) => {
	const _values = {
		fontWeight: values?.fontWeight,
		fontStyle: values?.fontStyle,
		lineHeight: values?.lineHeight,
		letterSpacing: values?.letterSpacing,
	};

	const handleOnChange = ( newValue ) => {
		onChange( {
			..._values,
			...newValue,
		} );
	};
	const handleFontWeightOnChange = ( newValue ) => {
		handleOnChange( {
			fontWeight: newValue,
		} );
	};
	const handleFontStyleOnChange = ( newValue ) => {
		handleOnChange( {
			fontStyle: newValue,
		} );
	};
	const handleLineHeightOnChange = ( newValue ) => {
		handleOnChange( {
			lineHeight: newValue,
		} );
	};
	const handleLetterSpacingOnChange = ( newValue ) => {
		handleOnChange( {
			letterSpacing: newValue,
		} );
	};

	return (
		<BaseControl className={ 'ystdtb-typography-control' }>
			<div className={ 'ystdtb-typography-control__row' }>
				<div>
					<FontWeightControl
						value={ _values.fontWeight }
						onChange={ handleFontWeightOnChange }
					/>
				</div>
				<div>
					<FontStyleControl
						value={ _values.fontStyle }
						onChange={ handleFontStyleOnChange }
					/>
				</div>
			</div>
			<div className={ 'ystdtb-typography-control__row' }>
				<div>
					<BaseControl
						id={ 'line-height' }
						label={ __( 'line height', 'ystandard-toolbox' ) }
					>
						<NumberControl
							value={ _values.lineHeight }
							onChange={ handleLineHeightOnChange }
							step={ 0.1 }
							shiftStep={ 0.5 }
						/>
					</BaseControl>
				</div>
				<div>
					<LetterSpacingControl
						value={ _values.letterSpacing }
						onChange={ handleLetterSpacingOnChange }
					/>
				</div>
			</div>
		</BaseControl>
	);
};
export default TypographySettingsControl;
