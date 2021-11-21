import { BaseControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const DisableOnInteraction = ( { attributes, setAttributes } ) => {
	const { autoplayDisableOnInteraction } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( { autoplayDisableOnInteraction: value } );
	};
	return (
		<BaseControl>
			<ToggleControl
				label={ __(
					'手動スライドで再生を止める',
					'ystandard-toolbox'
				) }
				onChange={ handleOnChange }
				checked={ autoplayDisableOnInteraction ?? true }
			/>
		</BaseControl>
	);
};

export default DisableOnInteraction;
