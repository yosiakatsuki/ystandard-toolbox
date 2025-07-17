/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Plugin Dependencies
 */
import { toNumber } from '@ystd/helper/number';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import NumberControl from '@aktk/block-components/wp-controls/number-control';

const LineHeight = ( { attributes, setAttributes } ) => {
	const { subTextLineHeight } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( {
			subTextLineHeight: toNumber( value ),
		} );
	};
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
};
export default LineHeight;
