import { BaseControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Speed = ( { attributes, setAttributes } ) => {
	const { speed } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( { speed: value } );
	};
	return (
		<BaseControl
			id={ 'speed' }
			label={ __( 'スライドの速さ(秒)', 'ystandard-toolbox' ) }
			__nextHasNoMarginBottom
		>
			<RangeControl
				value={ speed }
				onChange={ handleOnChange }
				initialPosition={ 0.3 }
				min={ 0.1 }
				max={ 100 }
				step={ 0.1 }
				allowReset={ true }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
		</BaseControl>
	);
};

export default Speed;
