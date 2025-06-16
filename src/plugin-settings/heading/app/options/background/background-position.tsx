/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Aktk Dependencies
 */
import { CustomSelectControl } from '@aktk/block-components/components/custom-select-control';
import InputControl from '@aktk/block-components/wp-controls/input-control';

/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';

const SELECT_OPTIONS = [
	{
		key: 'top left',
		name: __( 'top left', 'ystandard-toolbox' ),
	},
	{
		key: 'top center',
		name: __( 'top center', 'ystandard-toolbox' ),
	},
	{
		key: 'top right',
		name: __( 'top right', 'ystandard-toolbox' ),
	},
	{
		key: 'center left',
		name: __( 'center left', 'ystandard-toolbox' ),
	},
	{
		key: 'center center',
		name: __( 'center center', 'ystandard-toolbox' ),
	},
	{
		key: 'center right',
		name: __( 'center right', 'ystandard-toolbox' ),
	},
	{
		key: 'bottom left',
		name: __( 'bottom left', 'ystandard-toolbox' ),
	},
	{
		key: 'bottom center',
		name: __( 'bottom center', 'ystandard-toolbox' ),
	},
	{
		key: 'bottom right',
		name: __( 'bottom right', 'ystandard-toolbox' ),
	},
	{
		key: 'custom',
		name: __( 'カスタム', 'ystandard-toolbox' ),
	},
];

interface BackgroundPositionProps {
	value: string | undefined;
	onChange: ( newValue: { backgroundPosition: string | undefined } ) => void;
}

export default function BackgroundPosition( props: BackgroundPositionProps ) {
	const { value, onChange } = props;
	// カスタムサイズかどうか.
	const isCustom =
		!! value &&
		! SELECT_OPTIONS.find(
			( option ) => option.key === value && 'custom' !== option.key
		);

	const [ customPosition, setCustomPosition ] = useState< string >(
		isCustom ? value : ''
	);

	const handleOnSelectChange = ( newValue: string | undefined ) => {
		onChange( {
			backgroundPosition: newValue,
		} );
		if ( 'custom' !== newValue ) {
			setCustomPosition( '' );
		}
	};

	const handleOnInputChange = ( newValue: string | undefined ) => {
		setCustomPosition( newValue || '' );
		onChange( {
			backgroundPosition: newValue,
		} );
	};

	return (
		<PluginSettingsBaseControl
			id={ 'background-position' }
			label={ __( '背景位置', 'ystandard-toolbox' ) }
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
						value={ customPosition }
						onChange={ handleOnInputChange }
					/>
				</div>
			) }
			<ClearButton onClick={ () => handleOnSelectChange( undefined ) } />
		</PluginSettingsBaseControl>
	);
}
