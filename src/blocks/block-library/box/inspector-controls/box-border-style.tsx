import { BaseControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { borderStyles } from '../config';

const BoxBorderStyle = ( props ) => {
	const { attributes, setAttributes } = props;

	const { boxBorderStyle } = attributes;

	return (
		<BaseControl __nextHasNoMarginBottom>
			<SelectControl
				label={ __( '枠線スタイル', 'ystandard-toolbox' ) }
				value={ boxBorderStyle }
				options={ borderStyles }
				onChange={ ( value ) => {
					setAttributes( {
						boxBorderStyle: value,
					} );
				} }
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
		</BaseControl>
	);
};

export default BoxBorderStyle;
