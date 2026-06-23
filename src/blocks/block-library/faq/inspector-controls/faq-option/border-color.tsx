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
import type { FaqBlockAttributes } from '../../types';

// @ts-ignore.
export function BorderColor( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { borderColor, customBorderColor, borderType } =
		attributes as FaqBlockAttributes;

	const handleOnChange = ( newColor?: string, slug?: string ) => {
		setAttributes( {
			borderColor: slug,
			customBorderColor: slug ? undefined : newColor,
		} );
	};

	if ( ! borderType ) {
		return <></>;
	}

	return (
		<BaseControl
			id="faq-border-color"
			label={ __( '枠線の色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( '枠線の色', 'ystandard-toolbox' ) }
				value={ customBorderColor || '' }
				slug={ borderColor }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
