import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import RatioSizeControl from '@ystdtb/components/ratio-size-control';

const RatioSize = ( { attributes, setAttributes } ) => {
	const { ratio } = attributes;

	const handleOnChange = ( value ) => {
		setAttributes( { ratio: value } );
		if ( value ) {
			setAttributes( {
				height: undefined,
			} );
		}
	};
	return (
		<BaseControl>
			<RatioSizeControl
				label={ __( '縦横比', 'ystandard-toolbox' ) }
				value={ ratio }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default RatioSize;
