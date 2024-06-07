/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
/**
 * Aktk Dependencies
 */
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';

/**
 * Context
 */
import { HeadingContext } from '../index';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';

export default function TextColor() {
	// @ts-ignore
	const { headingOption, setHeadingOption, setIsEdit } =
		useContext( HeadingContext );
	const handleOnChange = ( newValue: string ) => {
		// @ts-ignore
		setHeadingOption( {
			...headingOption,
			style: {
				...headingOption?.style,
				color: newValue,
			},
		} );
		setIsEdit( true );
	};
	return (
		<>
			<BaseControl
				id={ 'text-color' }
				label={ __( '文字色', 'ystandard-toolbox' ) }
				isFullWidth={ true }
			>
				<ColorPalette
					label={ __( '文字色', 'ystandard-toolbox' ) }
					value={ headingOption?.style?.color || '' }
					onChange={ handleOnChange }
				/>
			</BaseControl>
		</>
	);
}
