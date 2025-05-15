import { BaseControl, RadioControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { effectOptions } from '../../config';

const Effect = ( { attributes, setAttributes } ) => {
	const { effect } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( { effect: value } );
	};
	return (
		<BaseControl
			id={ 'effect' }
			label={ __( 'エフェクト', 'ystandard-toolbox' ) }
			__nextHasNoMarginBottom
		>
			<RadioControl
				selected={ effect ?? 'slide' }
				onChange={ handleOnChange }
				options={ effectOptions }
			/>
		</BaseControl>
	);
};

export default Effect;
