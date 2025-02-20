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

interface BoxShadowControlProps {
	value: string | undefined;
	onChange: ( newValue: { boxShadow: string | undefined } ) => void;
}

export default function BoxShadow( props: BoxShadowControlProps ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: string | undefined ) => {
		onChange( {
			boxShadow: newValue || undefined,
		} );
	};
	return (
		<BaseControl
			id={ 'box-shadow' }
			label={ __( 'box-shadow', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<InputControl value={ value || '' } onChange={ handleOnChange } />
			<ClearButton onClick={ () => handleOnChange( undefined ) } />
		</BaseControl>
	);
}
