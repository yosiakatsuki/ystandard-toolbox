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
import { isResponsive } from '@aktk/block-components/utils/object';

// @ts-ignore
const MinHeight = ( { attributes, setAttributes } ) => {
	const { size, ratio } = attributes;

	// @ts-ignore
	const handleOnChange = ( newValue ) => {
		if ( undefined === newValue ) {
			return;
		}
		setAttributes( {
			size: parseSize( {
				...size,
				minHeight: {
					desktop: newValue,
				},
			} ),
		} );
	};
	// @ts-ignore
	const handleOnChangeResponsive = ( newValue ) => {
		if ( undefined === newValue ) {
			return;
		}
		const newSize = parseSize( {
			...size,
			minHeight: newValue,
		} );
		setAttributes( {
			size: newSize,
		} );
	};

	let _value;
	if ( ! isResponsive( size?.maxWidth ) ) {
		_value = size?.minHeight?.desktop;
	}

	return (
		<>
			{ ! ratio && (
				<BaseControl
					id="banner-min-height"
					label={ __( '最小高さ', 'ystandard-toolbox' ) }
				>
					<CustomSizeControl
						value={ _value }
						responsiveValue={ size?.minHeight }
						onChange={ handleOnChange }
						onChangeResponsive={ handleOnChangeResponsive }
						showResetButton={ false }
					/>
				</BaseControl>
			) }
		</>
	);
};
export default MinHeight;
