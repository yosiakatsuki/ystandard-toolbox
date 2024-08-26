/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { TextareaControl } from '@wordpress/components';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';

interface BackgroundControlProps {
	value: string | undefined;
	onChange: ( newValue: { background: string | undefined } ) => void;
}

export default function Background( props: BackgroundControlProps ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: string | undefined ) => {
		onChange( {
			background: newValue || undefined,
		} );
	};
	return (
		<BaseControl
			id={ 'background' }
			label={ __( 'background', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<TextareaControl
				value={ value || '' }
				onChange={ handleOnChange }
				rows={ 2 }
				__nextHasNoMarginBottom
				style={ { lineHeight: '1.3' } }
			/>
		</BaseControl>
	);
}
