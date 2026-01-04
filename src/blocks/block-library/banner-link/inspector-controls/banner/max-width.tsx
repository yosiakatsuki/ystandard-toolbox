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
import { isResponsive } from '@aktk/block-components/utils/object';

const MaxWidth = ( { attributes, setAttributes } ) => {
	const { size, blockPosition } = attributes;

	const handleOnChange = ( newValue ) => {
		if ( undefined === newValue ) {
			return;
		}
		const newSize = parseSize( {
			...size,
			maxWidth: {
				desktop: newValue,
			},
		} );
		setAttributes( {
			size: newSize,
			blockPosition: ! newSize ? undefined : blockPosition,
		} );
	};

	const handleOnChangeResponsive = ( newValue ) => {
		if ( undefined === newValue ) {
			return;
		}
		const newSize = parseSize( {
			...size,
			maxWidth: newValue,
		} );
		setAttributes( {
			size: newSize,
		} );
	};

	let _value;
	if ( ! isResponsive( size?.maxWidth ) ) {
		_value = size?.maxWidth?.desktop;
	}

	return (
		<>
			<BaseControl
				id="banner-max-width"
				label={ __( '最大幅', 'ystandard-toolbox' ) }
			>
				<CustomSizeControl
					value={ _value }
					responsiveValue={ size?.maxWidth }
					onChange={ handleOnChange }
					onChangeResponsive={ handleOnChangeResponsive }
					showResetButton={ false }
				/>
			</BaseControl>
		</>
	);
};
export default MaxWidth;
