/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import UnitControl, {
	useCustomUnits,
} from '@aktk/block-components/wp-controls/unit-control';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';

interface LetterSpacingControlProps {
	value: string | undefined;
	onChange: ( newValue: { letterSpacing: string | undefined } ) => void;
}

export default function LetterSpacing( props: LetterSpacingControlProps ) {
	const { value, onChange } = props;

	const handleOnChange = ( newValue: string ) => {
		onChange( {
			letterSpacing: newValue || undefined,
		} );
	};

	/**
	 * 設定できる単位を制限する
	 */
	const useLetterSpacingCustomUnits = () => {
		const em =
			useCustomUnits( {
				availableUnits: [ 'em' ],
			} ) || [];
		const px =
			useCustomUnits( {
				availableUnits: [ 'px' ],
			} ) || [];
		return [ ...em, ...px ];
	};

	return (
		<BaseControl
			id={ 'letter-spacing' }
			label={ __( '文字間隔', 'ystandard-toolbox' ) }
			isFullWidth={ true }
			className={ '[&_.components-custom-select-control__label]:hidden' }
		>
			<UnitControl
				value={ value || '' }
				units={ useLetterSpacingCustomUnits() }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
