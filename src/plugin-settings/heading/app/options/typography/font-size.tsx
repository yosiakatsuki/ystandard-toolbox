/**
 * WordPress
 */
import { __, _x } from '@wordpress/i18n';
/**
 * Akatsuki
 */
import CustomFontSizePicker, {
	sanitizeFontSize,
	type CustomFontSize,
} from '@aktk/block-components/components/custom-font-size-picker';
import { deleteUndefined } from '@aktk/block-components/utils/object';

/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';

interface FontSizeControlProps {
	value: CustomFontSize | undefined;
	onChange: ( newValue: { fontSize: CustomFontSize | undefined } ) => void;
}

export default function FontSize( props: FontSizeControlProps ) {
	const { value, onChange } = props;

	const handleOnChange = ( newValue: CustomFontSize ) => {
		// @ts-ignore
		onChange( {
			fontSize: sanitizeFontSize(
				deleteUndefined( {
					...value,
					...newValue,
				} )
			),
		} );
	};

	return (
		<BaseControl
			id={ 'font-size' }
			label={ __( '文字サイズ', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<CustomFontSizePicker
				fontSize={ value }
				onChange={ handleOnChange }
			/>
			<ClearButton
				onClick={ () => onChange( { fontSize: undefined } ) }
			/>
		</BaseControl>
	);
}
