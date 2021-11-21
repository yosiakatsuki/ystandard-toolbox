import { BaseControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const HasNavigation = ( { attributes, setAttributes } ) => {

	const { hasNavigation } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( { hasNavigation: value } );
	}
	return (
		<BaseControl>
			<ToggleControl
				label={ __( '矢印(ナビゲーション)を表示する', 'ystandard-toolbox' ) }
				onChange={ handleOnChange }
				checked={ hasNavigation ?? false }
			/>
		</BaseControl>
	);
}

export default HasNavigation;
