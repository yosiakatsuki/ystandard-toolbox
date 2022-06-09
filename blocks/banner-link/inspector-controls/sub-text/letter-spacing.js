import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import UnitControl from '@aktk/components/unit-control';

const LetterSpacing = ( { attributes, setAttributes } ) => {
	const { subTextLetterSpacing } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( {
			subTextLetterSpacing: value || undefined,
		} );
	};
	return (
		<BaseControl
			id={ 'subTextLetterSpacing' }
			label={ __( 'letter spacing', 'ystandard-toolbox' ) }
		>
			<UnitControl
				value={ subTextLetterSpacing }
				onChange={ handleOnChange }
				units={ [
					{ value: 'em', label: 'em' },
					{ value: 'px', label: 'px' },
				] }
				step={ 0.01 }
				isShiftStepEnabled={ false }
			/>
		</BaseControl>
	);
};
export default LetterSpacing;
