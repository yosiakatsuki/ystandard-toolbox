/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { CustomSizeControl } from '@aktk/block-components/components/custom-size-control';

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
			<CustomSizeControl
				value={ subTextMargin }
				onChange={ handleOnChange }
			/>
		</BaseControl>
	);
};
export default Margin;
