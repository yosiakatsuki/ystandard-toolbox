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
import type { SliderEditProps } from '../../types';

export function NavigationColor( props: SliderEditProps ): JSX.Element {
	const { attributes, setAttributes } = props;
	const { paginationColor } = attributes;

	// @ts-ignore
	const handleOnChange = ( newColor?: string ) => {
		setAttributes( {
			paginationColor: newColor,
		} );
	};

	return (
		<BaseControl
			id="slider-navigationColor"
			label={ __( 'ページネーション色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( 'ページネーション色', 'ystandard-toolbox' ) }
				value={ paginationColor || '' }
				slug={ '' }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
