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

interface AlignItemsProps {
	value: ResponsiveValues | undefined;
	displayValue: ResponsiveValues | undefined;
	onChange: ( newValue: { alignItems?: ResponsiveValues } ) => void;
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
		key: 'baseline',
		name: __( 'baseline', 'ystandard-toolbox' ),
	},
];

export default function AlignItems( props: AlignItemsProps ) {
	const { value, onChange, displayValue } = props;
	const handleOnChange = ( newValue: ResponsiveValues ) => {
		onChange( { alignItems: deleteUndefined( newValue ) } );
	};
	// flexが選択されていない場合は非表示.
	if ( ! isUseFlex( displayValue ) ) {
		return <></>;
	}
	return (
		<AdvancedResponsiveSelectControl
			id={ 'align-items' }
			label={ __( 'align-items', 'ystandard-toolbox' ) }
			value={ value }
			onChange={ handleOnChange }
			options={ SELECT_OPTIONS }
			onClear={ () => onChange( { alignItems: undefined } ) }
		/>
	);
}
