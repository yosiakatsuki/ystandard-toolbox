/**
 * WordPress.
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

const Size = ( { attributes, setAttributes } ) => {
	const { thumbnailSize } = attributes;
	const { imageSizes } = useSelect( ( select ) => {
		const { getSettings } = select( 'core/block-editor' );
		return {
			imageSizes: getSettings().imageSizes,
		};
	} );
	const imageSizesOptions = imageSizes.map( ( { name, slug } ) => ( {
		value: slug,
		label: name,
	} ) );

	const handleOnChange = ( newValue ) => {
		setAttributes( { thumbnailSize: newValue } );
	};
	return (
		<BaseControl>
			<SelectControl
				label={ __( '画像サイズ', 'ystandard-toolbox' ) }
				value={ thumbnailSize }
				options={ imageSizesOptions }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default Size;
