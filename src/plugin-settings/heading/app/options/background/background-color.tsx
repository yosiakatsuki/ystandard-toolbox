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

interface BackgroundColorProps {
	value: string | undefined;
	onChange: ( newValue: { backgroundColor: string | undefined } ) => void;
}

export default function BackgroundColor( props: BackgroundColorProps ) {
	const { value = '', onChange } = props;
	const handleOnColorChange = ( newValue: string | undefined ) => {
		onChange( {
			backgroundColor: newValue || undefined,
		} );
	};
	return (
		<PluginSettingsBaseControl
			id={ 'background-color' }
			label={ __( '背景色', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<ColorPalette
				label={ __( '背景色', 'ystandard-toolbox' ) }
				value={ value }
				onChange={ handleOnColorChange }
				enableCurrentColor={ true }
			/>
			<ClearButton onClick={ () => handleOnColorChange( undefined ) } />
		</PluginSettingsBaseControl>
	);
}
