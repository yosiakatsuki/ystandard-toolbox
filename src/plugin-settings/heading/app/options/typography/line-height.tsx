/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';
import LineHeightControl from '@aktk/block-components/wp-controls/line-height-control';

interface LineHeightControlProps {
	value: string | undefined;
	onChange: ( newValue: { lineHeight: string | undefined } ) => void;
}

export default function LineHeight( props: LineHeightControlProps ) {
	const { value, onChange } = props;

	const handleOnChange = ( newValue: number | undefined ) => {
		onChange( {
			lineHeight: newValue ? `${ newValue }` : undefined,
		} );
	};
	return (
		<BaseControl
			id={ 'line-height' }
			label={ __( 'Line Height', 'ystandard-toolbox' ) }
			isFullWidth={ true }
			className={ '[&_.components-custom-select-control__label]:hidden' }
		>
			<LineHeightControl
				value={ value || '' }
				onChange={ handleOnChange }
			/>
			<ClearButton onClick={ () => handleOnChange( undefined ) } />
		</BaseControl>
	);
}
