/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import {
	CustomFontSizePicker,
	type CustomFontSizePickerOnChangeProps,
} from '@aktk/block-components/components/custom-font-size-picker';

/**
 * Block dependencies.
 */
import type { DtBlockProps } from '../../types';

export function FontSize( props: DtBlockProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { textSize, customTextSize, responsiveTextSize } = attributes;

	const handleOnChange = ( newSize: CustomFontSizePickerOnChangeProps ) => {
		const { fontSize, customFontSize, responsiveFontSize } = newSize;

		setAttributes( {
			textSize: fontSize?.slug,
			customTextSize: ! fontSize ? customFontSize : undefined,
			responsiveTextSize: responsiveFontSize,
		} );
	};

	return (
		<BaseControl
			id="dt-font-size"
			label={ __( '文字サイズ', 'ystandard-toolbox' ) }
		>
			<CustomFontSizePicker
				fontSize={ textSize }
				customFontSize={ customTextSize }
				responsiveFontSize={ responsiveTextSize }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
