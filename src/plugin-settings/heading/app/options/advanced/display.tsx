/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';

/**
 * Plugin Dependencies
 */
import type { ResponsiveValues } from '@aktk/block-components/types';
import { deleteUndefined } from '@aktk/block-components/utils/object';
/**
 * Internal Dependencies
 */
import { AdvancedResponsiveSelectControl } from './controls';

interface ResponsiveDisplayProps {
	value: ResponsiveValues | undefined;
	onChange: ( newValue: { display: ResponsiveValues } ) => void;
}

const SELECT_OPTIONS = [
	{
		key: 'block',
		name: __( 'block', 'ystandard-toolbox' ),
	},
	{
		key: 'inline',
		name: __( 'inline', 'ystandard-toolbox' ),
	},
	{
		key: 'inline-block',
		name: __( 'inline-block', 'ystandard-toolbox' ),
	},
	{
		key: 'flex',
		name: __( 'flex', 'ystandard-toolbox' ),
	},
	{
		key: 'inline-flex',
		name: __( 'inline-flex', 'ystandard-toolbox' ),
	},
];

export function ResponsiveDisplay( props: ResponsiveDisplayProps ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: ResponsiveValues ) => {
		onChange( { display: deleteUndefined( newValue ) } );
	};
	return (
		<AdvancedResponsiveSelectControl
			id={ 'display' }
			label={ __( 'display', 'ystandard-toolbox' ) }
			value={ value }
			onChange={ handleOnChange }
			options={ SELECT_OPTIONS }
		/>
	);
}
