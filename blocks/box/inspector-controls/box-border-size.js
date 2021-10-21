import {
	BaseControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { units } from "../config";


const BoxBorderSize = ( props ) => {

	const {
		attributes,
		setAttributes,
	} = props;

	const {
		boxBorderSize
	} = attributes;

	return (
		<BaseControl>
			<UnitControl
				label={ __( '枠線サイズ', 'ystandard-toolbox' ) }
				value={ boxBorderSize }
				onChange={ ( value ) => {
					setAttributes( {
						boxBorderSize: value,
					} );
				} }
				units={ units }
			/>
		</BaseControl>
	);
}

export default BoxBorderSize;
