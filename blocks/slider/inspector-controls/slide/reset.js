import { BaseControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { isObject, parseObject } from "@ystdtb/helper/object";

const Reset = ( { type, attributes, setAttributes } ) => {

	const { slides } = attributes;

	const handleOnClick = () => {
		let _slides = slides;
		if ( isObject( _slides ) && _slides.hasOwnProperty( type ) ) {
			delete _slides[ type ];
		}
		setAttributes( {
			slides: parseObject( _slides )
		} );
	}

	return (
		<BaseControl>
			<div className="ystdtb-slider__slide-option-reset">
				<Button
					isDestructive
					isTertiary
					isSmall
					onClick={ handleOnClick }
				>
					{ __( 'リセット', 'ystandard-toolbox' ) }
				</Button>
			</div>
		</BaseControl>
	);
}
export default Reset;
