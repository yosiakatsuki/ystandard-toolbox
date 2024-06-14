/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * Aktk Dependencies
 */
import { ColorPalette } from '@aktk/block-components/components/color-pallet-control';

/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';

interface TextColorControlProps {
	value: string | undefined;
	onChange: ( newValue: { color: string | undefined } ) => void;
}
export default function TextColor( props: TextColorControlProps ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: string ) => {
		onChange( { color: newValue || undefined } );
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
					value={ value || '' }
					onChange={ handleOnChange }
				/>
			</BaseControl>
		</>
	);
}
