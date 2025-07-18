/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Plugin Dependencies
 */
import ResponsiveValues from '@aktk/components/responsive-values';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

const Margin = ( { attributes, setAttributes } ) => {
	const { subTextMargin } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( {
			subTextMargin: value,
		} );
	};
	return (
		<BaseControl
			id="sub-text-margin"
			label={ __( 'メインテキストとの間隔', 'ystandard-toolbox' ) }
		>
			<ResponsiveValues
				values={ subTextMargin }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default Margin;
