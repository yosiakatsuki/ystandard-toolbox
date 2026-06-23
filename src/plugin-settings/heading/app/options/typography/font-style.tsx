/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * Aktk Dependencies
 */
import { FontStyleControl } from '@aktk/block-components/wp-controls/font-appearance-control';
/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';

interface FontStyleControlProps {
	value: string | undefined;
	onChange: ( newValue: { fontStyle: string | undefined } ) => void;
}

export default function FontStyle( props: FontStyleControlProps ) {
	const { value, onChange } = props;

	const handleOnChange = ( newValue: string | undefined ) => {
		onChange( {
			fontStyle: newValue || undefined,
		} );
	};

	return (
		<PluginSettingsBaseControl
			id={ 'font-style' }
			label={ __( '文字スタイル', 'ystandard-toolbox' ) }
			isFullWidth={ true }
			className={ '[&_.components-custom-select-control__label]:hidden' }
		>
			<FontStyleControl
				value={ value || '' }
				onChange={ handleOnChange }
			/>
			<ClearButton onClick={ () => handleOnChange( undefined ) } />
		</PluginSettingsBaseControl>
	);
}
