/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * Akatsuki
 */
import CustomFontSizePicker, {
	type CustomFontSize,
} from '@aktk/block-components/components/custom-font-size-picker';
import { deleteUndefined } from '@aktk/block-components/utils/object';

/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';

interface FontSizeControlProps {
	value: CustomFontSize | undefined;
	onChange: ( newValue: { fontSize: CustomFontSize } ) => void;
}

export default function FontSize( props: FontSizeControlProps ) {
	const { value, onChange } = props;

	const handleOnChange = ( newValue: CustomFontSize ) => {
		// @ts-ignore
		onChange( {
			fontSize: deleteUndefined( {
				...value,
				...newValue,
			} ),
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
		</BaseControl>
	);
}
