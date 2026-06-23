/**
 * WordPress.
 */
import { __ } from '@wordpress/i18n';
import { arrowRight, arrowDown } from '@wordpress/icons';
import { Button } from '@wordpress/components';

const OrientationControl = ( { layout, onChange } ) => {
	const { orientation } = layout;
	const handleOnClick = ( newValue ) => {
		if (
			'vertical' === newValue.orientation &&
			'space-between' === layout?.justifyContent
		) {
			newValue.justifyContent = 'left';
		}
		onChange( {
			...layout,
			...newValue,
		} );
	};
	return (
		<fieldset>
			<legend>{ __( 'Orientation' ) }</legend>
			<Button
				label={ __( 'Horizontal' ) }
				icon={ arrowRight }
				isPressed={ orientation === 'horizontal' }
				onClick={ () => handleOnClick( { orientation: 'horizontal' } ) }
			/>
			<Button
				label={ __( 'Vertical' ) }
				icon={ arrowDown }
				isPressed={ orientation === 'vertical' }
				onClick={ () => handleOnClick( { orientation: 'vertical' } ) }
			/>
		</fieldset>
	);
};

export default OrientationControl;
