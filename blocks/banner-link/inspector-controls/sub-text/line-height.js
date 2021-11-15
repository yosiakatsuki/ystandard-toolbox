import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import NumberControl from "@ystdtb/components/number-control";
import { toNumber } from "@ystdtb/helper/number";

const LineHeight = ( { attributes, setAttributes } ) => {

	const { subTextLineHeight } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( {
			subTextLineHeight: toNumber( value ),
		} );
	}
	return (
		<BaseControl
			id={ 'subTextLineHeight' }
			label={ __( 'line height', 'ystandard-toolbox' ) }
		>
			<NumberControl
				value={ subTextLineHeight }
				onChange={ handleOnChange }
				step={ 0.1 }
			/>
		</BaseControl>
	);
}
export default LineHeight;
