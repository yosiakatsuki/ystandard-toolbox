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
export function BackgroundColor( props ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { backgroundColor, customBackgroundColor } =
		attributes as FaqBlockAttributes;

	const handleOnChange = ( newColor?: string, slug?: string ) => {
		setAttributes( {
			backgroundColor: slug,
			customBackgroundColor: slug ? undefined : newColor,
		} );
	};

	return (
		<BaseControl
			id="faq-background-color"
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
