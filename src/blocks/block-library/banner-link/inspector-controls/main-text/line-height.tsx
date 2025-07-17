/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Plugin Dependencies
 */
import { toNumber } from '@aktk/helper/number';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import NumberControl from '@aktk/block-components/wp-controls/number-control';

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
