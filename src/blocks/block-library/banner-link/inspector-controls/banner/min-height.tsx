/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { CustomSizeControl } from '@aktk/block-components/components/custom-size-control';
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
				<BaseControl
					id="banner-min-height"
					label={ __( '最小高さ', 'ystandard-toolbox' ) }
				>
					<CustomSizeControl
						value={ size?.minHeight }
						onChange={ handleOnChange }
					/>
				</BaseControl>
			) }
		</>
	);
};
export default MinHeight;
