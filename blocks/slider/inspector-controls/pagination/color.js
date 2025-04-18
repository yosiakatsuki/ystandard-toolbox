import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ColorPaletteControl from '@ystd/components/color-palette-control';

const Color = ( { attributes, setAttributes } ) => {
	const { paginationColor } = attributes;
	const handleOnChange = ( color ) => {
		setAttributes( { paginationColor: color } );
	};

	return (
		<BaseControl
			id={ 'paginationColor' }
			label={ __( '色', 'ystandard-toolbox' ) }
			__nextHasNoMarginBottom
		>
			<ColorPaletteControl
				value={ paginationColor }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default Color;
