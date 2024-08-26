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
import { isUseFlex } from './utils';

interface ResponsiveDisplayProps {
	value: ResponsiveValues | undefined;
	onChange: ( newValue: {
		display?: ResponsiveValues;
		flexDirection?: ResponsiveValues;
		alignItems?: ResponsiveValues;
		justifyContent?: ResponsiveValues;
		gap?: ResponsiveValues;
	} ) => void;
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
		let _newValue = { display: deleteUndefined( newValue ) };
		// flexが選択されていない場合はflex関連の設定クリア.
		if ( ! isUseFlex( newValue ) ) {
			_newValue = {
				..._newValue,
				...{
					flexDirection: undefined,
					alignItems: undefined,
					justifyContent: undefined,
					gap: undefined,
				},
			};
		}
		onChange( _newValue );
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
