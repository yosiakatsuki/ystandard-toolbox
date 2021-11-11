import { __ } from '@wordpress/i18n';
import { SelectControl } from '@wordpress/components';
import { getComponentConfig } from "@ystdtb/helper/config";

const RatioSizeControl = ( { label, value, onChange, options = undefined } ) => {

	const _options = options ?? [
		{ value: '', label: __( '指定なし', 'ystandard-toolbox' ) },
		...getComponentConfig( 'ratioOptions' ),
	]

	const handleOnChange = ( newValue ) => {
		onChange( !! newValue ? newValue : undefined );
	}
	return (
		<div className="ystdtb-component-ratio-size-control">
			<SelectControl
				label={ label }
				value={ value }
				onChange={ handleOnChange }
				options={ _options }
			/>
		</div>
	);
}
export default RatioSizeControl;
