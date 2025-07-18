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
import { parseSize } from '../../function/edit';

const MinHeight = ( { attributes, setAttributes } ) => {
	const { size, ratio } = attributes;

	const handleOnChange = ( newValue ) => {
		setAttributes( {
			size: parseSize( {
				...size,
				minHeight: newValue,
			} ),
		} );
	};
	return (
		<>
			{ ! ratio && (
				<BaseControl id="banner-min-height">
					<ResponsiveValues
						label={ __( '最小高さ', 'ystandard-toolbox' ) }
						values={ size?.minHeight }
						onChange={ handleOnChange }
					/>
				</BaseControl>
			) }
		</>
	);
};
export default MinHeight;
