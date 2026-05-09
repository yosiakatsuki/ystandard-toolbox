/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import type { FontSize } from '@wordpress/components/src/font-size-picker/types';
/**
 * Akatsuki
 */
import {
	CustomFontSizePicker,
	type ResponsiveFontSize,
	type CustomFontSizePickerOnChangeProps,
} from '@aktk/block-components/components/custom-font-size-picker';
import { stripUndefined } from '@aktk/block-components/utils/object';

/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';
import type { CustomFontSize } from '@aktk/plugin-settings/heading/types';
import { isNumber } from 'lodash';

interface FontSizeControlProps {
	value: CustomFontSize | undefined;
	responsiveValue: ResponsiveFontSize | undefined;
	onChange: ( newValue: {
		fontSize: CustomFontSize | undefined;
		responsiveFontSize?: ResponsiveFontSize;
	} ) => void;
}

export default function FontSize( props: FontSizeControlProps ) {
	const { value, responsiveValue, onChange } = props;

	const handleOnChange = ( newValue: CustomFontSizePickerOnChangeProps ) => {
		// fontSize の size が number の場合、px を付与
		const fontSizeSize = isNumber( newValue?.fontSize?.size )
			? `${ newValue?.fontSize?.size }px`
			: newValue?.fontSize?.size;
		if ( newValue?.responsiveFontSize ) {
			onChange( {
				fontSize: undefined,
				responsiveFontSize: sanitizeResponsiveFontSize(
					newValue.responsiveFontSize
				),
			} );
			return;
		}

		onChange( {
			fontSize: sanitizeFontSize(
				newValue?.fontSize ?? fontSizeSize ?? newValue?.customFontSize
			),
			responsiveFontSize: undefined,
		} );
	};

	const fontSize = getFontSizeValue( value );
	const customFontSize = getCustomFontSizeValue( value );
	const responsiveFontSize = getResponsiveFontSizeValue(
		value,
		responsiveValue
	);

	return (
		<PluginSettingsBaseControl
			id={ 'font-size' }
			label={ __( '文字サイズ', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<CustomFontSizePicker
				fontSize={ fontSize }
				customFontSize={
					customFontSize ? `${ customFontSize }` : undefined
				}
				responsiveFontSize={ responsiveFontSize }
				onChange={ handleOnChange }
				responsiveControlStyle={ 'horizontal' }
				showResetButton={ false }
			/>
			<ClearButton
				onClick={ () =>
					onChange( {
						fontSize: undefined,
						responsiveFontSize: undefined,
					} )
				}
			/>
		</PluginSettingsBaseControl>
	);
}

function sanitizeFontSize(
	fontSize: CustomFontSize | undefined
): CustomFontSize | undefined {
	if ( ! fontSize ) {
		return undefined;
	}
	if ( 'string' === typeof fontSize ) {
		return fontSize;
	}
	const size = fontSize?.size;
	const slug = fontSize?.slug;
	const name = fontSize?.name;
	if ( size && slug && name ) {
		return fontSize;
	}

	return undefined;
}

function sanitizeResponsiveFontSize(
	fontSize: ResponsiveFontSize
): ResponsiveFontSize | undefined {
	const result = {
		desktop: fontSize.desktop,
		tablet: fontSize.tablet,
		mobile: fontSize.mobile,
	};
	return stripUndefined( result ) as ResponsiveFontSize | undefined;
}

function getFontSizeValue( value: CustomFontSize | undefined ) {
	if ( ! value || 'string' === typeof value ) {
		return undefined;
	}
	if ( value.fontSize ) {
		return value.fontSize as FontSize;
	}
	if ( value.slug ) {
		return value as FontSize;
	}
	return undefined;
}

function getCustomFontSizeValue( value: CustomFontSize | undefined ) {
	if ( ! value ) {
		return undefined;
	}
	if ( 'string' === typeof value ) {
		return value;
	}
	const customSize = value.fontSize?.size ?? value.desktop ?? value.size;
	return customSize ? `${ customSize }` : undefined;
}

function getResponsiveFontSizeValue(
	value: CustomFontSize | undefined,
	responsiveValue: ResponsiveFontSize | undefined
) {
	if ( responsiveValue ) {
		return responsiveValue;
	}
	if ( value && 'object' === typeof value ) {
		return {
			desktop: value.desktop,
			tablet: value.tablet,
			mobile: value.mobile,
		};
	}
	return undefined;
}
