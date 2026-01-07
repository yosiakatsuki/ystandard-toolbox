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

export function BackgroundColor( props: TimeLineInspectorProps ): JSX.Element {
	const { updateChildAttributes, firstChildAttributes } = props;
	// 初期値設定.
	const [ backgroundColor, setBackgroundColor ] = useState<
		string | undefined
	>( firstChildAttributes?.labelBackgroundColor );
	const [ customBackgroundColor, setCustomBackgroundColor ] = useState<
		string | undefined
	>( firstChildAttributes?.customLabelBackgroundColor );
	// 値の更新.
	const handleOnChange = ( newColor?: string, slug?: string ) => {
		const labelBackgroundColor = slug;
		const customLabelBackgroundColor = slug ? undefined : newColor;

		updateChildAttributes( {
			labelBackgroundColor,
			customLabelBackgroundColor,
		} );
		setBackgroundColor( labelBackgroundColor );
		setCustomBackgroundColor( customLabelBackgroundColor );
	};

	return (
		<BaseControl
			id="background-color"
			label={ __( '背景色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( '背景色', 'ystandard-toolbox' ) }
				value={ customBackgroundColor || '' }
				slug={ backgroundColor }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
