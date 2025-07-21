/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { CustomSizeControl } from '@aktk/block-components/components/custom-size-control';

/**
 * Block Dependencies.
 */
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
			<BaseControl id="banner-max-width" label={ __( '最大幅', 'ystandard-toolbox' ) }>
				<CustomSizeControl
					value={ size?.maxWidth }
					onChange={ handleOnChange }
				/>
			</BaseControl>
		</>
	);
};
export default MaxWidth;
