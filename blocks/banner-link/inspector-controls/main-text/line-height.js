import { BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import NumberControl from '@ystdtb/components/number-control';
import { toNumber } from '@ystdtb/helper/number';

const LineHeight = ( { attributes, setAttributes } ) => {
	const { mainTextLineHeight } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( {
			mainTextLineHeight: toNumber( value ),
		} );
	};
	return (
		<BaseControl
			id={ 'mainTextLineHeight' }
			label={ __( 'line height', 'ystandard-toolbox' ) }
		>
			<NumberControl
				value={ mainTextLineHeight }
				onChange={ handleOnChange }
				step={ 0.1 }
			/>
		</BaseControl>
	);
};
export default LineHeight;
