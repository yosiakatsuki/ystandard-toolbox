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

export function BorderColor( props: TimeLineInspectorProps ): JSX.Element {
	const { updateChildAttributes, firstChildAttributes } = props;
	// 初期値設定.
	const [ borderColor, setBorderColor ] = useState< string | undefined >(
		firstChildAttributes?.contentsBorderColor
	);
	const [ customBorderColor, setCustomBorderColor ] = useState<
		string | undefined
	>( firstChildAttributes?.contentsBorderColor );
	// 値の更新.
	const handleOnChange = ( newColor?: string, slug?: string ) => {
		const contentsBorderColor = slug;
		const customContentsBorderColor = slug ? undefined : newColor;

		updateChildAttributes( {
			contentsBorderColor,
			customContentsBorderColor,
		} );
		setBorderColor( contentsBorderColor );
		setCustomBorderColor( customContentsBorderColor );
	};

	return (
		<BaseControl
			id="border-color"
			label={ __( '線の色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( '線の色', 'ystandard-toolbox' ) }
				value={ customBorderColor || '' }
				slug={ borderColor }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
