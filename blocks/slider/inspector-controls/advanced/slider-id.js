import { BaseControl, TextControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const SliderId = ( props ) => {
	const { attributes, setAttributes } = props;
	const { sliderId } = attributes;
	const [ disableIdInput, setDisableIdInput ] = useState( true );
	const handleOnChange = ( value ) => {
		setAttributes( { sliderId: value } );
	};
	return (
		<BaseControl
			id={ 'sliderId' }
			label={ __( 'スライダーID', 'ystandard-toolbox' ) }
		>
			<TextControl
				value={ sliderId }
				onChange={ handleOnChange }
				disabled={ disableIdInput }
			/>
			<div style={ { marginTop: '-20px' } }>
				<Button
					isSmall
					isSecondary
					onClick={ () => {
						setDisableIdInput( false );
					} }
				>
					{ __( 'IDを変更する', 'ystandard-toolbox' ) }
				</Button>
			</div>
		</BaseControl>
	);
};
export default SliderId;
