import { BaseControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { getSlidesOption } from '../../function/slider-option';
import { setSlidesOption } from '../../function/edit';

const CenteredSlides = ( { type, attributes, setAttributes } ) => {
	const optionName = 'centeredSlides';
	const { slides } = attributes;
	const centeredSlides = getSlidesOption( slides, type, optionName );

	const handleOnChange = ( newValue ) => {
		setSlidesOption( {
			setAttributes,
			type,
			slides,
			newValue: {
				centeredSlides: ! newValue ? undefined : newValue,
			},
		} );
	};

	return (
		<BaseControl
			id={ 'BaseControl' }
			label={ __( 'スライドの中央表示', 'ystandard-toolbox' ) }
		>
			<ToggleControl
				label={ __(
					'中央からスライドを表示する',
					'ystandard-toolbox'
				) }
				onChange={ handleOnChange }
				checked={ centeredSlides ?? false }
			/>
		</BaseControl>
	);
};

export default CenteredSlides;
