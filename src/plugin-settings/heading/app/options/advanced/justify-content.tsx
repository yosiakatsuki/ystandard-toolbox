/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';

/**
 * Plugin Dependencies
 */
import type { ResponsiveValues } from '@aktk/block-components/types';
import { stripUndefined } from '@aktk/block-components/utils/object';
/**
 * Internal Dependencies
 */
import { AdvancedResponsiveSelectControl } from './controls';
import { isUseFlex } from '@aktk/plugin-settings/heading/app/options/advanced/utils';

interface JustifyContentProps {
	value: string | undefined;
	responsiveValue: ResponsiveValues | undefined;
	displayValue: string | undefined;
	responsiveDisplayValue: ResponsiveValues | undefined;
	onChange: ( newValue: {
		justifyContent?: string;
		responsiveJustifyContent?: ResponsiveValues;
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
		key: 'space-between',
		name: __( 'space-between', 'ystandard-toolbox' ),
	},
	{
		key: 'space-around',
		name: __( 'space-around', 'ystandard-toolbox' ),
	},
];

export default function JustifyContent( props: JustifyContentProps ) {
	const {
		value,
		responsiveValue,
		onChange,
		displayValue,
		responsiveDisplayValue,
	} = props;
	const handleDefaultChange = ( newValue: string | undefined ) => {
		onChange( {
			justifyContent: newValue,
			responsiveJustifyContent: undefined,
		} );
	};
	const handleResponsiveChange = ( newValue: ResponsiveValues ) => {
		onChange( {
			justifyContent: undefined,
			responsiveJustifyContent: stripUndefined( newValue ),
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
			id={ 'justify-content' }
			label={ __( 'justify-content', 'ystandard-toolbox' ) }
			value={ value }
			responsiveValue={ responsiveValue }
			onDefaultChange={ handleDefaultChange }
			onResponsiveChange={ handleResponsiveChange }
			onClear={ () =>
				onChange( {
					justifyContent: undefined,
					responsiveJustifyContent: undefined,
				} )
			}
			options={ SELECT_OPTIONS }
		/>
	);
}
