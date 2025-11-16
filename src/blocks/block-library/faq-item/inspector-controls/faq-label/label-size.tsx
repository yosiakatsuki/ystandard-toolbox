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

// @ts-ignore.
export function LabelSize( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { labelSize, customLabelSize } = attributes;

	const handleOnChange = ( newSize: CustomFontSizePickerOnChangeProps ) => {
		const { fontSize, customFontSize } = newSize;

		setAttributes( {
			labelSize: fontSize?.slug,
			customLabelSize: ! fontSize ? customFontSize : undefined,
		} );
	};
	return (
		<BaseControl
			id="faq-item-label-position"
			label={ __( 'FAQラベル表示位置', 'ystandard-toolbox' ) }
		>
			<CustomFontSizePicker
				fontSize={ labelSize }
				customFontSize={ customLabelSize }
				onChange={ handleOnChange }
				useResponsive={ false }
			/>
		</BaseControl>
	);
}
