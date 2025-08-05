/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { CustomFontSizePicker } from '@aktk/block-components/components/custom-font-size-picker';
import type { CustomFontSizePickerOnChangeProps } from '@aktk/block-components/components/custom-font-size-picker';
import { getResponsiveValues } from '@aktk/helper/responsive';

const FontSize = ( props ) => {
	const { attributes, setAttributes } = props;

	const { mainTextFontSize } = attributes;

	const handleOnChange = ( values: CustomFontSizePickerOnChangeProps ) => {
		// CustomFontSizePickerの出力をResponsiveFontSizeの形式に変換
		if ( values.responsiveFontSize ) {
			// レスポンシブモードの場合
			setAttributes( {
				mainTextFontSize: getResponsiveValues(
					values.responsiveFontSize
				),
			} );
		} else if ( values.fontSize || values.customFontSize ) {
			// 通常モードの場合
			let desktopValue;
			if ( values.fontSize ) {
				// テーマフォントサイズの場合
				desktopValue = values.fontSize;
			} else if ( values.customFontSize ) {
				// カスタムフォントサイズの場合（文字列として保存）
				desktopValue = values.customFontSize;
			}

			setAttributes( {
				mainTextFontSize: getResponsiveValues( {
					desktop: desktopValue,
					tablet: undefined,
					mobile: undefined,
				} ),
			} );
		}
	};

	// 現在のfontSizeデータをCustomFontSizePickerの形式に変換
	const convertToPickerFormat = ( fontSizeData: any ) => {
		if ( ! fontSizeData ) {
			return {
				fontSize: undefined,
				customFontSize: undefined,
				responsiveFontSize: undefined,
			};
		}

		// レスポンシブデータがある場合
		if ( fontSizeData.tablet || fontSizeData.mobile ) {
			return {
				fontSize: undefined,
				customFontSize: undefined,
				responsiveFontSize: {
					desktop: fontSizeData.desktop?.size || fontSizeData.desktop,
					tablet: fontSizeData.tablet,
					mobile: fontSizeData.mobile,
				},
			};
		}

		// デスクトップのみの場合
		const desktopValue = fontSizeData.desktop;
		if ( desktopValue?.slug ) {
			// テーマのフォントサイズの場合
			return {
				fontSize: desktopValue,
				customFontSize: undefined,
				responsiveFontSize: undefined,
			};
		} else {
			// カスタムサイズの場合
			return {
				fontSize: undefined,
				customFontSize: desktopValue?.size || desktopValue,
				responsiveFontSize: undefined,
			};
		}
	};

	const pickerProps = convertToPickerFormat( mainTextFontSize );

	return (
		<BaseControl
			id="main-text-font-size"
			label={ __( 'フォントサイズ', 'ystandard-toolbox' ) }
		>
			<CustomFontSizePicker
				fontSize={ pickerProps.fontSize }
				customFontSize={ pickerProps.customFontSize }
				responsiveFontSize={ pickerProps.responsiveFontSize }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default FontSize;