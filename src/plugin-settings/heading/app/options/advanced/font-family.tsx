/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
/**
 * Aktk Dependencies
 */
import {
	FontFamilySelect,
	useFontFamilies,
} from '@aktk/block-components/components/font-family-select';
import { ToggleGroup } from '@aktk/block-components/components/toggle-group';
import type { FontFamilies } from '@aktk/block-components/wp-controls/font-family-control';
import InputControl from '@aktk/block-components/wp-controls/input-control';
/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';

type FontFamilyInputMode = 'select' | 'custom';

interface FontFamilyControlProps {
	value: string | undefined;
	onChange: ( newValue: { fontFamily: string | undefined } ) => void;
}

const isSelectableFontFamily = (
	value: string | undefined,
	fontFamilies: FontFamilies
) => {
	if ( ! value ) {
		return false;
	}
	return fontFamilies.some( ( fontFamily ) => {
		return fontFamily.fontFamily === value;
	} );
};

const getInputMode = (
	value: string | undefined,
	fontFamilies: FontFamilies
): FontFamilyInputMode => {
	if ( ! value ) {
		return 'select';
	}
	return isSelectableFontFamily( value, fontFamilies ) ? 'select' : 'custom';
};

export default function FontFamily( props: FontFamilyControlProps ) {
	const { value, onChange } = props;
	const fontFamilies = useFontFamilies();
	const [ inputMode, setInputMode ] = useState<
		FontFamilyInputMode | undefined
	>( undefined );

	const mode = inputMode || getInputMode( value, fontFamilies );

	const handleOnChange = ( newValue: string | undefined ) => {
		onChange( {
			fontFamily: newValue || undefined,
		} );
	};
	const handleModeChange = ( newMode: string | number | undefined ) => {
		if ( 'select' !== newMode && 'custom' !== newMode ) {
			return;
		}
		setInputMode( newMode );
		if (
			'select' === newMode &&
			! isSelectableFontFamily( value, fontFamilies )
		) {
			handleOnChange( undefined );
		}
	};

	return (
		<PluginSettingsBaseControl
			id={ 'font-family' }
			label={ __( 'font-family', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<ToggleGroup
				label={ __( '入力方法', 'ystandard-toolbox' ) }
				value={ mode }
				onChange={ handleModeChange }
				isBlock={ true }
				isDeselectable={ false }
				options={ [
					{
						label: __( '登録フォント', 'ystandard-toolbox' ),
						value: 'select',
					},
					{
						label: __( '直接入力', 'ystandard-toolbox' ),
						value: 'custom',
					},
				] }
			/>
			{ 'select' === mode ? (
				<FontFamilySelect
					value={ value }
					onChange={ handleOnChange }
					fontFamilies={ fontFamilies }
				/>
			) : (
				<InputControl
					value={ value || '' }
					onChange={ handleOnChange }
				/>
			) }
			<ClearButton
				onClick={ () => {
					setInputMode( 'select' );
					handleOnChange( undefined );
				} }
			/>
		</PluginSettingsBaseControl>
	);
}
