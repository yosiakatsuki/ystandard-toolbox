import {
	BaseControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { units } from "../config";


const LabelBorderRadius = ( props ) => {

	const {
		attributes,
		setAttributes,
	} = props;

	const {
		labelBorderRadius
	} = attributes;

	return (
		<BaseControl
			id={ 'label-border-radius' }
			label={ __( '角丸', 'ystandard-toolbox' ) }
		>
			<UnitControl
				value={ labelBorderRadius }
				onChange={ ( value ) => {
					setAttributes( {
						labelBorderRadius: value,
					} );
				} }
				units={ units }
			/>
		</BaseControl>
	);
}

export default LabelBorderRadius;
