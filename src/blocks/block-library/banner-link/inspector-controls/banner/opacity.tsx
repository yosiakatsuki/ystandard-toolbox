/*
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';

/*
 * Aktk Dependencies
 */
import BaseControl from '@aktk/block-components/wp-controls/base-control';

const Opacity = ( { attributes, setAttributes } ) => {
	const { backgroundOpacity } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( { backgroundOpacity: value } );
	};
	return (
		<BaseControl id="banner-opacity">
			<RangeControl
				label={ __( '不透明度', 'ystandard-toolbox' ) }
				value={ backgroundOpacity }
				onChange={ handleOnChange }
				min={ 0 }
				max={ 1 }
				step={ 0.1 }
				allowReset
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
		</BaseControl>
	);
};
export default Opacity;
