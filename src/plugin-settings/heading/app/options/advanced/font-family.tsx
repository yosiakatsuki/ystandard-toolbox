/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';
import InputControl from '@aktk/block-components/wp-controls/input-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';

interface FontFamilyControlProps {
	value: string | undefined;
	onChange: ( newValue: { fontFamily: string | undefined } ) => void;
}

export default function FontFamily( props: FontFamilyControlProps ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: string | undefined ) => {
		onChange( {
			fontFamily: newValue || undefined,
		} );
	};
	return (
		<BaseControl
			id={ 'font-family' }
			label={ __( 'font-family', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<InputControl value={ value || '' } onChange={ handleOnChange } />
			<ClearButton onClick={ () => handleOnChange( undefined ) } />
		</BaseControl>
	);
}
