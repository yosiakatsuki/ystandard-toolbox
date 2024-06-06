/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
/**
 * Context
 */
import { HeadingContext } from '../index';
/**
 * Akatsuki
 */
import CustomFontSizePicker, {
	type CustomFontSize,
} from '@aktk/block-components/components/custom-font-size-picker';

/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';
/**
 * CSS
 */
import './style-editor.scss';

export default function FontSize() {
	// @ts-ignore
	const { headingOption, setHeadingOption, setIsEdit } =
		useContext( HeadingContext );

	const handleOnChange = ( newValue: CustomFontSize ) => {
		// @ts-ignore
		setHeadingOption( {
			...headingOption,
			style: {
				...headingOption?.style,
				fontSize: newValue,
			},
		} );
		setIsEdit( true );
	};

	return (
		<BaseControl
			id={ 'font-size' }
			label={ __( '文字サイズ', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<CustomFontSizePicker
				fontSize={ headingOption?.style?.fontSize }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
}
