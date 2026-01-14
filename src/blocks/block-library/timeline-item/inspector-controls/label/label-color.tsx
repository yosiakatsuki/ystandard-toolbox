/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';

/**
 * Block dependencies.
 */
import type { TimeLineItemProps } from '../../types';

export function LabelColor( props: TimeLineItemProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { labelType, labelColor, customLabelColor } = attributes;

	if ( ! labelType ) {
		return <></>;
	}
	// 値の更新.
	const handleOnChange = ( newColor?: string, slug?: string ) => {
		const _labelColor = slug;
		const _customLabelColor = slug ? undefined : newColor;

		setAttributes( {
			labelColor: _labelColor,
			customLabelColor: _customLabelColor,
		} );
	};

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
