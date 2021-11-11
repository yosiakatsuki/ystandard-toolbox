import { BaseControl, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Opacity = ( { attributes, setAttributes } ) => {

	const { backgroundOpacity } = attributes;
	const handleOnChange = ( value ) => {
		setAttributes( { backgroundOpacity: value } );
	}
	return (
		<BaseControl>
			<RangeControl
				label={ __( '不透明度', 'ystandard-toolbox' ) }
				value={ backgroundOpacity }
				onChange={ handleOnChange }
				min={ 0 }
				max={ 1 }
				step={ 0.1 }
			/>
		</BaseControl>
	);
}
export default Opacity;
