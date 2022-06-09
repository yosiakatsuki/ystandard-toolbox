import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { getSlidesOption } from '../../function/slider-option';
import { setSlidesOption } from '../../function/edit';
import UnitControl from '@aktk/components/unit-control';

const SpaceBetween = ( { type, attributes, setAttributes } ) => {
	const optionName = 'spaceBetween';
	const { slides } = attributes;
	const spaceBetween = getSlidesOption( slides, type, optionName );

	const handleOnChange = ( newValue ) => {
		setSlidesOption( {
			setAttributes,
			type,
			slides,
			newValue: {
				spaceBetween: ! newValue ? undefined : parseInt( newValue ),
			},
		} );
	};

	return (
		<BaseControl
			id={ 'BaseControl' }
			label={ __( 'スライド間の余白', 'ystandard-toolbox' ) }
		>
			<UnitControl
				value={ spaceBetween }
				onChange={ handleOnChange }
				units={ [ { value: 'px', label: 'px' } ] }
			/>
		</BaseControl>
	);
};

export default SpaceBetween;
