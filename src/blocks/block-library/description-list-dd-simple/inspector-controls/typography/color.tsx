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
 * Block Dependencies.
 */
import type { DtBlockProps } from '../../types';

export function Color( props: DtBlockProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { textColor, customTextColor } = attributes;
	const handleOnChange = ( newColor?: string, slug?: string ) => {
		setAttributes( {
			textColor: slug,
			customTextColor: slug ? undefined : newColor,
		} );
	};
	return (
		<BaseControl
			id="dt-text-color"
			label={ __( '文字色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( '文字色', 'ystandard-toolbox' ) }
				value={ customTextColor || '' }
				slug={ textColor }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
