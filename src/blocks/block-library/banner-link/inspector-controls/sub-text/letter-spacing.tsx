/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import UnitControl from '@aktk/block-components/wp-controls/unit-control';

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
