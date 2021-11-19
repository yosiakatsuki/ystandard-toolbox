import { BaseControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const AutoplayDelay = ( { attributes, setAttributes } ) => {

	const { autoplayDelay } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( { autoplayDelay: value } );
	}
	return (
		<BaseControl
			id={ 'autoplayDelay' }
			label={ __( 'スライド切り替えの時間(秒)', 'ystandard-toolbox' ) }
		>
			<RangeControl
				value={ autoplayDelay }
				onChange={ handleOnChange }
				initialPosition={ 3 }
				min={ 1 }
				max={ 10 }
				step={ 0.1 }
				allowReset={ true }
			/>
		</BaseControl>
	);
}

export default AutoplayDelay;
