/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';

/**
 * Block dependencies.
 */
import type { TimeLineInspectorProps } from '../../types';

export function LabelBorderColor( props: TimeLineInspectorProps ): JSX.Element {
	const { updateChildAttributes, firstChildAttributes } = props;
	// 初期値設定.
	const [ borderColor, setBorderColor ] = useState< string | undefined >(
		firstChildAttributes?.labelBackgroundColor
	);
	const [ customBorderColor, setCustomBorderColor ] = useState<
		string | undefined
	>( firstChildAttributes?.customLabelBackgroundColor );
	// 値の更新.
	const handleOnChange = ( newColor?: string, slug?: string ) => {
		const labelBorderColor = slug;
		const customLabelBorderColor = slug ? undefined : newColor;

		updateChildAttributes( {
			labelBorderColor,
			customLabelBorderColor,
		} );
		setBorderColor( labelBorderColor );
		setCustomBorderColor( customLabelBorderColor );
	};

	return (
		<BaseControl
			id="label-border-color"
			label={ __( 'ラベル枠線の色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( 'ラベル枠線の色', 'ystandard-toolbox' ) }
				value={ customBorderColor || '' }
				slug={ borderColor }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
