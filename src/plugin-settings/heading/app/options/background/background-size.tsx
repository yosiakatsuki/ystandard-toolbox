/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Aktk Dependencies
 */
import CustomSelectControl from '@aktk/block-components/wp-controls/custom-select-control';
import InputControl from '@aktk/block-components/wp-controls/input-control';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';

const SELECT_OPTIONS = [
	{
		key: 'cover',
		name: __( 'cover', 'ystandard-toolbox' ),
	},
	{
		key: 'contain',
		name: __( 'contain', 'ystandard-toolbox' ),
	},
	{
		key: 'custom',
		name: __( 'カスタム', 'ystandard-toolbox' ),
	},
];

interface BackgroundSizeProps {
	value: string | undefined;
	onChange: ( newValue: { backgroundSize: string | undefined } ) => void;
}

export default function BackgroundSize( props: BackgroundSizeProps ) {
	const { value, onChange } = props;
	// カスタムサイズかどうか.
	const isCustom =
		!! value &&
		! SELECT_OPTIONS.find(
			( option ) => option.key === value && 'custom' !== option.key
		);

	const [ customSize, setCustomSize ] = useState< string >(
		isCustom ? value : ''
	);

	const handleOnSelectChange = ( newValue: string | undefined ) => {
		onChange( {
			backgroundSize: newValue,
		} );
		if ( 'custom' !== newValue ) {
			setCustomSize( '' );
		}
	};

	const handleOnInputChange = ( newValue: string | undefined ) => {
		setCustomSize( newValue || '' );
		onChange( {
			backgroundSize: newValue,
		} );
	};

	return (
		<BaseControl
			id={ 'background-size' }
			label={ __( '背景サイズ', 'ystandard-toolbox' ) }
		>
			<CustomSelectControl
				value={ isCustom ? 'custom' : value || '' }
				options={ SELECT_OPTIONS }
				onChange={ handleOnSelectChange }
				emptyLabel={ __( '--指定なし--', 'ystandard-toolbox' ) }
			/>
			{ isCustom && (
				<div className={ 'mt-4' }>
					<InputControl
						value={ customSize }
						onChange={ handleOnInputChange }
					/>
				</div>
			) }
			<ClearButton onClick={ () => handleOnSelectChange( undefined ) } />
		</BaseControl>
	);
}
