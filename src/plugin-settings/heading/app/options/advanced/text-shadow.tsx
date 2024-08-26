/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';
import InputControl from '@aktk/block-components/wp-controls/input-control';

interface TextShadowControlProps {
	value: string | undefined;
	onChange: ( newValue: { textShadow: string | undefined } ) => void;
}

export default function TextShadow( props: TextShadowControlProps ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: string | undefined ) => {
		onChange( {
			textShadow: newValue || undefined,
		} );
	};
	return (
		<BaseControl
			id={ 'text-shadow' }
			label={ __( 'text-shadow', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<InputControl value={ value || '' } onChange={ handleOnChange } />
		</BaseControl>
	);
}
