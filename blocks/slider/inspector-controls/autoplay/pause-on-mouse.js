import { BaseControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const PauseOnMouse = ( { attributes, setAttributes } ) => {
	const { autoplayPauseOnMouse } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( { autoplayPauseOnMouse: value } );
	};
	return (
		<BaseControl __nextHasNoMarginBottom>
			<ToggleControl
				label={ __(
					'マウスホバーで再生を止める',
					'ystandard-toolbox'
				) }
				onChange={ handleOnChange }
				checked={ autoplayPauseOnMouse ?? false }
				__nextHasNoMarginBottom
			/>
		</BaseControl>
	);
};

export default PauseOnMouse;
