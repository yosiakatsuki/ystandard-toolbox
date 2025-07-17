/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Plugin Dependencies
 */
import RatioSizeControl from '@ystd/components/ratio-size-control';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

const RatioSize = ( { attributes, setAttributes } ) => {
	const { size, ratio } = attributes;

	const handleOnChange = ( value ) => {
		setAttributes( { ratio: value } );
		if ( value ) {
			setAttributes( {
				size: {
					...size,
					minHeight: undefined,
				},
			} );
		}
	};
	return (
		<BaseControl id="banner-ratio-size">
			<RatioSizeControl
				label={ __( '縦横比', 'ystandard-toolbox' ) }
				value={ ratio }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default RatioSize;
