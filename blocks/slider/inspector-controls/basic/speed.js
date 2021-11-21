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
		>
			<RangeControl
				value={ speed }
				onChange={ handleOnChange }
				initialPosition={ 0.3 }
				min={ 0.1 }
				max={ 3 }
				step={ 0.1 }
				allowReset={ true }
			/>
		</BaseControl>
	);
};

export default Speed;
