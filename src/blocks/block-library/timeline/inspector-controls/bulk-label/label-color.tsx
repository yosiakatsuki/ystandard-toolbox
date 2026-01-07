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

export function LabelColor( props: TimeLineInspectorProps ): JSX.Element {
	const { updateChildAttributes, firstChildAttributes } = props;
	// 初期値設定.
	const [ labelColor, setLabelColor ] = useState< string | undefined >(
		firstChildAttributes?.labelColor
	);
	const [ customLabelColor, setCustomLabelColor ] = useState<
		string | undefined
	>( firstChildAttributes?.contentsLabelColor );
	// 値の更新.
	const handleOnChange = ( newColor?: string, slug?: string ) => {
		const _labelColor = slug;
		const _customLabelColor = slug ? undefined : newColor;

		updateChildAttributes( {
			labelColor: _labelColor,
			customLabelColor: _customLabelColor,
		} );
		setLabelColor( _labelColor );
		setCustomLabelColor( _customLabelColor );
	};

	if ( ! firstChildAttributes?.labelType ) {
		return <></>;
	}

	return (
		<BaseControl
			id="label-color"
			label={ __( '文字・アイコン 色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( '文字・アイコン 色', 'ystandard-toolbox' ) }
				value={ customLabelColor || '' }
				slug={ labelColor }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
