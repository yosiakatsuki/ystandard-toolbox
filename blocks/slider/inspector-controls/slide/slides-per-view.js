import { BaseControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { getSlidesOption } from '../../function/slider-option';
import { setSlidesOption } from '../../function/edit';

const SlidesPerView = ( { type, attributes, setAttributes } ) => {
	const optionName = 'slidesPerView';
	const { slides } = attributes;
	const slidesPerView = getSlidesOption( slides, type, optionName );

	const handleOnChange = ( newValue ) => {
		setSlidesOption( {
			setAttributes,
			type,
			slides,
			newValue: { slidesPerView: 1 === newValue ? undefined : newValue },
		} );
	};

	return (
		<BaseControl
			id={ 'BaseControl' }
			label={ __( '1画面に表示するスライド数', 'ystandard-toolbox' ) }
			__nextHasNoMarginBottom
		>
			<RangeControl
				value={ slidesPerView }
				onChange={ handleOnChange }
				initialPosition={ 1 }
				min={ 1 }
				max={ 6 }
				allowReset={ true }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
		</BaseControl>
	);
};

export default SlidesPerView;
