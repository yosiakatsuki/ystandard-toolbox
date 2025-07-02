import { BaseControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const BackgroundOpacity = ( props ) => {
	const { attributes, setAttributes } = props;

	const { backgroundImageCoverOpacity } = attributes;

	const handleOnChange = ( value ) => {
		setAttributes( { backgroundImageCoverOpacity: value } );
	};

	return (
		<BaseControl __nextHasNoMarginBottom>
			<RangeControl
				label={ __( '背景色の不透明度', 'ystandard-toolbox' ) }
				value={ backgroundImageCoverOpacity }
				onChange={ handleOnChange }
				min={ 0 }
				max={ 1 }
				step={ 0.1 }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
		</BaseControl>
	);
};

export default BackgroundOpacity;
