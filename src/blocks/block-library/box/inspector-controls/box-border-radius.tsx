import {
	BaseControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { units } from '../utils';

const BoxBorderRadius = ( props ) => {
	const { attributes, setAttributes } = props;

	const { boxBorderRadius } = attributes;

	return (
		<BaseControl __nextHasNoMarginBottom>
			<UnitControl
				label={ __( '枠線角丸', 'ystandard-toolbox' ) }
				value={ boxBorderRadius }
				onChange={ ( value ) => {
					setAttributes( {
						boxBorderRadius: value,
					} );
				} }
				units={ units }
				__next40pxDefaultSize
			/>
		</BaseControl>
	);
};

export default BoxBorderRadius;
