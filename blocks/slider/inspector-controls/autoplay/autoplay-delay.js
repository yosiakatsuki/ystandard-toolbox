import { BaseControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const AutoplayDelay = ( { attributes, setAttributes } ) => {
	const { autoplayDelay } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( { autoplayDelay: value } );
	};
	return (
		<BaseControl
			id={ 'autoplayDelay' }
			label={ __( 'スライド切り替えの時間(秒)', 'ystandard-toolbox' ) }
			__nextHasNoMarginBottom
		>
			<RangeControl
				value={ autoplayDelay ?? 8 }
				onChange={ handleOnChange }
				initialPosition={ 8 }
				min={ 0 }
				max={ 15 }
				step={ 0.1 }
				allowReset={ true }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
		</BaseControl>
	);
};

export default AutoplayDelay;
