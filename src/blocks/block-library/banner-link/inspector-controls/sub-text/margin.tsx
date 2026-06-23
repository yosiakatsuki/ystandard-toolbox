/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';
import { CustomSizeControl } from '@aktk/block-components/components/custom-size-control';
import { isResponsive } from '@aktk/block-components/utils/object';

// @ts-ignore
const Margin = ( { attributes, setAttributes } ) => {
	const { subTextMargin } = attributes;

	// @ts-ignore
	const handleOnChange = ( value ) => {
		if ( undefined === value ) {
			return;
		}
		setAttributes( {
			subTextMargin: {
				desktop: value,
			},
		} );
	};

	// @ts-ignore
	const handleOnChangeResponsive = ( value ) => {
		if ( undefined === value ) {
			return;
		}
		setAttributes( {
			subTextMargin: value,
		} );
	};

	let _value;
	if ( ! isResponsive( subTextMargin ) ) {
		_value = subTextMargin?.desktop;
	}

	return (
		<BaseControl
			id="sub-text-margin"
			label={ __( 'メインテキストとの間隔', 'ystandard-toolbox' ) }
		>
			<CustomSizeControl
				value={ _value }
				responsiveValue={ subTextMargin }
				onChange={ handleOnChange }
				onChangeResponsive={ handleOnChangeResponsive }
				showResetButton={ false }
			/>
		</BaseControl>
	);
};
export default Margin;
