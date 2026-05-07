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
	value: string | undefined;
	responsiveValue: ResponsiveValues | undefined;
	displayValue: string | undefined;
	responsiveDisplayValue: ResponsiveValues | undefined;
	onChange: ( newValue: {
		alignItems?: string;
		responsiveAlignItems?: ResponsiveValues;
	} ) => void;
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
	const {
		value,
		responsiveValue,
		onChange,
		displayValue,
		responsiveDisplayValue,
	} = props;
	const handleDefaultChange = ( newValue: string | undefined ) => {
		onChange( {
			alignItems: newValue,
			responsiveAlignItems: undefined,
		} );
	};
	const handleResponsiveChange = ( newValue: ResponsiveValues ) => {
		onChange( {
			alignItems: undefined,
			responsiveAlignItems: deleteUndefined( newValue ),
		} );
	};
	const isFlex =
		displayValue === 'flex' ||
		displayValue === 'inline-flex' ||
		isUseFlex( responsiveDisplayValue );
	if ( ! isFlex ) {
		return <></>;
	}
	return (
		<AdvancedResponsiveSelectControl
			id={ 'align-items' }
			label={ __( 'align-items', 'ystandard-toolbox' ) }
			value={ value }
			responsiveValue={ responsiveValue }
			onDefaultChange={ handleDefaultChange }
			onResponsiveChange={ handleResponsiveChange }
			options={ SELECT_OPTIONS }
			onClear={ () =>
				onChange( {
					alignItems: undefined,
					responsiveAlignItems: undefined,
				} )
			}
		/>
	);
}
