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

const MaxWidth = ( { attributes, setAttributes } ) => {
	const { size } = attributes;

	const handleOnChange = ( newValue ) => {
		const newSize = parseSize( {
			...size,
			maxWidth: newValue,
		} );
		setAttributes( {
			size: newSize,
		} );
		if ( ! newSize ) {
			setAttributes( {
				blockPosition: undefined,
			} );
		}
	};
	return (
		<>
			<BaseControl id="banner-max-width">
				<ResponsiveValues
					label={ __( '最大幅', 'ystandard-toolbox' ) }
					values={ size?.maxWidth }
					onChange={ handleOnChange }
				/>
			</BaseControl>
		</>
	);
};
export default MaxWidth;
