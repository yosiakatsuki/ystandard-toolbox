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
import { isEmpty } from '@aktk/block-components/utils/object';

/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';
import type { CustomFontSize } from '@aktk/plugin-settings/heading/types';
import { isNumber } from 'lodash';

interface FontSizeControlProps {
	value: CustomFontSize | undefined;
	onChange: ( newValue: { fontSize: CustomFontSize | undefined } ) => void;
}

export default function FontSize( props: FontSizeControlProps ) {
	const { value, onChange } = props;

	const handleOnChange = ( newValue: CustomFontSizePickerOnChangeProps ) => {
		// fontSize の size が number の場合、px を付与
		const fontSizeSize = isNumber( newValue?.fontSize?.size )
			? `${ newValue?.fontSize?.size }px`
			: newValue?.fontSize?.size;
		// 更新用のフォントサイズを作成
		const newFontSize = {
			desktop:
				newValue?.responsiveFontSize?.desktop ??
				fontSizeSize ??
				newValue?.customFontSize,
			tablet: newValue?.responsiveFontSize?.tablet,
			mobile: newValue?.responsiveFontSize?.mobile,
			fontSize: newValue?.fontSize,
		} as CustomFontSize;
		// @ts-ignore
		onChange( {
			fontSize: sanitizeFontSize( newFontSize ),
		} );
	};

	const fontSize = value?.fontSize as FontSize;
	const customFontSize = value?.fontSize?.size ?? value?.desktop;
	const responsiveFontSize: ResponsiveFontSize = {
		desktop: value?.desktop,
		tablet: value?.tablet,
		mobile: value?.mobile,
	};

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
				onClick={ () => onChange( { fontSize: undefined } ) }
			/>
		</PluginSettingsBaseControl>
	);
}

function sanitizeFontSize(
	fontSize: CustomFontSize
): CustomFontSize | undefined {
	// fontSize.fontSize が存在しない場合、fontSize を削除
	if ( fontSize?.fontSize ) {
		const size = fontSize.fontSize?.size;
		const slug = fontSize.fontSize?.slug;
		const name = fontSize.fontSize?.name;
		if ( ! size || ! slug || ! name ) {
			// fontSize.fontSize を削除
			delete fontSize.fontSize;
		}
	} else {
		delete fontSize.fontSize;
	}
	// desktop が存在しない場合、desktop を削除
	if ( ! fontSize?.desktop ) {
		delete fontSize.desktop;
	}
	// tablet が存在しない場合、tablet を削除
	if ( ! fontSize?.tablet ) {
		delete fontSize.tablet;
	}
	// mobile が存在しない場合、mobile を削除
	if ( ! fontSize?.mobile ) {
		delete fontSize.mobile;
	}

	return isEmpty( fontSize ) ? undefined : fontSize;
}
