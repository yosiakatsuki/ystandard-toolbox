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
import type { TimeLineItemProps } from '../../types';

export function FontSize( props: TimeLineItemProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { labelType, labelFontSize, customLabelFontSize } = attributes;

	if ( ! labelType ) {
		return <></>;
	}

	const handleOnChange = ( newSize: CustomFontSizePickerOnChangeProps ) => {
		const { fontSize, customFontSize } = newSize;

		setAttributes( {
			labelFontSize: fontSize?.slug,
			customLabelFontSize: ! fontSize?.slug ? customFontSize : undefined,
		} );
	};

	return (
		<BaseControl
			id="font-size"
			label={ __( '文字・アイコン サイズ', 'ystandard-toolbox' ) }
		>
			<CustomFontSizePicker
				fontSize={ labelFontSize }
				customFontSize={ customLabelFontSize }
				onChange={ handleOnChange }
				useResponsive={ false }
			/>
		</BaseControl>
	);
}
