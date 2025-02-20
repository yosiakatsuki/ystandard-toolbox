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

interface FlexDirectionProps {
	value: ResponsiveValues | undefined;
	displayValue: ResponsiveValues | undefined;
	onChange: ( newValue: { flexDirection?: ResponsiveValues } ) => void;
}

const SELECT_OPTIONS = [
	{
		key: 'row',
		name: __( 'row', 'ystandard-toolbox' ),
	},
	{
		key: 'row-reverse',
		name: __( 'row-reverse', 'ystandard-toolbox' ),
	},
	{
		key: 'column',
		name: __( 'column', 'ystandard-toolbox' ),
	},
	{
		key: 'column-reverse',
		name: __( 'column-reverse', 'ystandard-toolbox' ),
	},
];

export default function FlexDirection( props: FlexDirectionProps ) {
	const { value, onChange, displayValue } = props;
	const handleOnChange = ( newValue: ResponsiveValues ) => {
		onChange( { flexDirection: deleteUndefined( newValue ) } );
	};
	// flexが選択されていない場合は非表示.
	if ( ! isUseFlex( displayValue ) ) {
		return <></>;
	}
	return (
		<AdvancedResponsiveSelectControl
			id={ 'flex-direction' }
			label={ __( 'flex-direction', 'ystandard-toolbox' ) }
			value={ value }
			onChange={ handleOnChange }
			onClear={ () => onChange( { flexDirection: undefined } ) }
			options={ SELECT_OPTIONS }
		/>
	);
}
