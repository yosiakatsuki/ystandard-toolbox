import {
	BaseControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { units } from '../config';

const BoxBorderRadius = ( props ) => {
	const { attributes, setAttributes } = props;

	const { boxBorderRadius } = attributes;

	return (
		<BaseControl>
			<UnitControl
				label={ __( '枠線角丸', 'ystandard-toolbox' ) }
				value={ boxBorderRadius }
				onChange={ ( value ) => {
					setAttributes( {
						boxBorderRadius: value,
					} );
				} }
				units={ units }
			/>
		</BaseControl>
	);
};

export default BoxBorderRadius;
