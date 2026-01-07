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
import type { TimeLineInspectorProps } from '../../types';

export function BorderColor( props: TimeLineInspectorProps ): JSX.Element {
	const { updateChildAttributes } = props;
	const handleOnChange = ( newColor?: string, slug?: string ) => {
		updateChildAttributes( {
			contentsBorderColor: slug,
			customContentsBorderColor: slug ? undefined : newColor,
		} );
	};

	return (
		<BaseControl
			id="border-color"
			label={ __( '線の色', 'ystandard-toolbox' ) }
		>
			<ColorPalette
				label={ __( '線の色', 'ystandard-toolbox' ) }
				value={ '' }
				slug={ '' }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
