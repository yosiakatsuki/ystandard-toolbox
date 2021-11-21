import { BaseControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { getSlidesOption } from '../../function/slider-option';
import { setSlidesOption } from '../../function/edit';

const SlidesPerGroup = ( { type, attributes, setAttributes } ) => {
	const optionName = 'slidesPerGroup';
	const { slides } = attributes;
	const slidesPerGroup = getSlidesOption( slides, type, optionName );

	const handleOnChange = ( newValue ) => {
		setSlidesOption( {
			setAttributes,
			type,
			slides,
			newValue: { slidesPerGroup: 1 === newValue ? undefined : newValue },
		} );
	};

	return (
		<BaseControl
			id={ 'BaseControl' }
			label={ __( 'グループ化するスライド数', 'ystandard-toolbox' ) }
		>
			<RangeControl
				value={ slidesPerGroup }
				onChange={ handleOnChange }
				initialPosition={ 1 }
				min={ 1 }
				max={ 6 }
				allowReset={ true }
			/>
		</BaseControl>
	);
};

export default SlidesPerGroup;
