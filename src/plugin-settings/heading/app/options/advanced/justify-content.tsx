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
import { isUseFlex } from '@aktk/plugin-settings/heading/app/options/advanced/utils';

interface JustifyContentProps {
	value: ResponsiveValues | undefined;
	displayValue: ResponsiveValues | undefined;
	onChange: ( newValue: { justifyContent: ResponsiveValues } ) => void;
}

const SELECT_OPTIONS = [
	{
		key: 'flex-start',
		name: __( 'flex-start', 'ystandard-toolbox' ),
	},
	{
		key: 'center',
		name: __( 'center', 'ystandard-toolbox' ),
	},
	{
		key: 'flex-end',
		name: __( 'flex-end', 'ystandard-toolbox' ),
	},
	{
		key: 'space-between',
		name: __( 'space-between', 'ystandard-toolbox' ),
	},
	{
		key: 'space-around',
		name: __( 'space-around', 'ystandard-toolbox' ),
	},
];

export default function JustifyContent( props: JustifyContentProps ) {
	const { value, onChange, displayValue } = props;
	const handleOnChange = ( newValue: ResponsiveValues ) => {
		onChange( { justifyContent: deleteUndefined( newValue ) } );
	};
	// flexが選択されていない場合は非表示.
	if ( ! isUseFlex( displayValue ) ) {
		return <></>;
	}
	return (
		<AdvancedResponsiveSelectControl
			id={ 'justify-content' }
			label={ __( 'justify-content', 'ystandard-toolbox' ) }
			value={ value }
			onChange={ handleOnChange }
			options={ SELECT_OPTIONS }
		/>
	);
}
