/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Plugin Dependencies
 */
import ResponsiveFontSize from '@aktk/components/responsive-font-size';
import { getResponsiveValues } from '@aktk/helper/responsive';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

const FontSize = ( props ) => {
	const { attributes, setAttributes } = props;

	const { mainTextFontSize } = attributes;

	const handleOnChange = ( values ) => {
		setAttributes( {
			mainTextFontSize: getResponsiveValues( values ),
		} );
	};

	return (
		<BaseControl id="main-text-font-size">
			<ResponsiveFontSize
				label={ __( 'フォントサイズ', 'ystandard-toolbox' ) }
				values={ mainTextFontSize }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default FontSize;
