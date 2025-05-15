/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * Aktk Dependencies
 */
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';

/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';

interface IconColorControlProps {
	value: string | undefined;
	onChange: ( newValue: { iconColor: string | undefined } ) => void;
}
export function IconColor( props: IconColorControlProps ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: string ) => {
		onChange( { iconColor: newValue || undefined } );
	};

	return (
		<>
			<PluginSettingsBaseControl
				id={ 'icon-color' }
				label={ __( 'アイコン色', 'ystandard-toolbox' ) }
				isFullWidth={ true }
			>
				<ColorPalette
					label={ __( 'アイコン色', 'ystandard-toolbox' ) }
					value={ value || '' }
					onChange={ handleOnChange }
				/>
				<ClearButton
					onClick={ () => onChange( { iconColor: undefined } ) }
				/>
			</PluginSettingsBaseControl>
		</>
	);
}
