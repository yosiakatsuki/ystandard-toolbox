/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import CustomSelectControl from '@aktk/block-components/wp-controls/custom-select-control';

/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';

const SELECT_OPTIONS = [
	{
		key: 'no-repeat',
		name: __( 'no-repeat', 'ystandard-toolbox' ),
	},
	{
		key: 'repeat',
		name: __( 'repeat', 'ystandard-toolbox' ),
	},
	{
		key: 'repeat-x',
		name: __( 'repeat-x', 'ystandard-toolbox' ),
	},
	{
		key: 'repeat-y',
		name: __( 'repeat-y', 'ystandard-toolbox' ),
	},
	{
		key: 'space',
		name: __( 'space', 'ystandard-toolbox' ),
	},
	{
		key: 'round',
		name: __( 'round', 'ystandard-toolbox' ),
	},
];

interface BackgroundRepeatProps {
	value: string | undefined;
	onChange: ( newValue: { backgroundRepeat: string | undefined } ) => void;
}

export default function BackgroundRepeat( props: BackgroundRepeatProps ) {
	const { value, onChange } = props;

	const handleOnSelectChange = ( newValue: string | undefined ) => {
		onChange( {
			backgroundRepeat: newValue,
		} );
	};
	return (
		<PluginSettingsBaseControl
			id={ 'background-repeat' }
			label={ __( '繰り返し', 'ystandard-toolbox' ) }
		>
			<CustomSelectControl
				value={ value || '' }
				options={ SELECT_OPTIONS }
				onChange={ handleOnSelectChange }
				emptyLabel={ __( '--指定なし--', 'ystandard-toolbox' ) }
			/>
			<ClearButton onClick={ () => handleOnSelectChange( undefined ) } />
		</PluginSettingsBaseControl>
	);
}
