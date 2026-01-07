/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
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
import type { TimeLineInspectorProps } from '../../types';

export function FontSize( props: TimeLineInspectorProps ): JSX.Element {
	const { updateChildAttributes, firstChildAttributes } = props;
	const [ fontSize, setFontSize ] = useState< string | undefined >(
		firstChildAttributes?.labelFontSize
	);
	const [ customFontSize, setCustomFontSize ] = useState<
		string | undefined
	>( firstChildAttributes?.customLabelFontSize );

	const handleOnChange = ( newSize: CustomFontSizePickerOnChangeProps ) => {
		const { fontSize: _fontSize, customFontSize: _customFontSize } =
			newSize;

		updateChildAttributes( {
			labelFontSize: _fontSize?.slug,
			customLabelFontSize: ! _customFontSize ? customFontSize : undefined,
		} );
		setFontSize( _fontSize?.slug );
		setCustomFontSize( _customFontSize );
	};

	if ( ! firstChildAttributes?.labelType ) {
		return <></>;
	}

	return (
		<BaseControl
			id="font-size"
			label={ __( '文字・アイコン サイズ', 'ystandard-toolbox' ) }
		>
			<CustomFontSizePicker
				fontSize={ fontSize }
				customFontSize={ customFontSize }
				onChange={ handleOnChange }
				useResponsive={ false }
			/>
		</BaseControl>
	);
}
