import { BaseControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { getComponentConfig } from '@ystd/helper/config';

const BackgroundRepeat = ( props ) => {
	const { attributes, setAttributes } = props;

	const { backgroundImageRepeat } = attributes;

	const repeatOptions = getComponentConfig( 'backgroundRepeat' );

	const handleOnChange = ( value ) => {
		setAttributes( { backgroundImageRepeat: value } );
	};

	return (
		<BaseControl __nextHasNoMarginBottom>
			<SelectControl
				label={ __( '背景画像繰り返し', 'ystandard-toolbox' ) }
				value={ backgroundImageRepeat }
				options={ repeatOptions }
				onChange={ handleOnChange }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
		</BaseControl>
	);
};

export default BackgroundRepeat;
