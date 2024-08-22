/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import CustomSelectControl from '@aktk/block-components/wp-controls/custom-select-control';
import {
	ResponsiveSelectTab,
	ResponsiveControlGrid,
} from '@aktk/block-components/components/tab-panel';
import type { ResponsiveValues } from '@aktk/block-components/types';
import { deleteUndefined } from '@aktk/block-components/utils/object';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';
import { isResponsiveHeadingOption } from '@aktk/plugin-settings/heading/app/options/util';
import { IconSelectControl } from '@aktk/block-components/components/icon-control';

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
		<BaseControl
			id={ 'display' }
			label={ __( 'display', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<ResponsiveSelectTab
				isResponsive={ isResponsiveHeadingOption( value ) }
				defaultTabContent={
					<DefaultResponsiveDisplayEdit
						value={ value }
						onChange={ handleOnChange }
					/>
				}
				responsiveTabContent={
					<ResponsiveResponsiveDisplayEdit
						value={ value }
						onChange={ handleOnChange }
					/>
				}
			/>
		</BaseControl>
	);
}

function DefaultResponsiveDisplayEdit( props: {
	value: ResponsiveValues | undefined;
	onChange: ( newValue: ResponsiveValues ) => void;
} ) {
	const { value, onChange } = props;
	const handleOnSelectChange = ( newValue: string ) => {
		onChange( {
			desktop: '' === newValue ? undefined : newValue,
			tablet: undefined,
			mobile: undefined,
		} );
	};
	return (
		<CustomSelectControl
			value={ value?.desktop || '' }
			options={ SELECT_OPTIONS }
			onChange={ handleOnSelectChange }
		/>
	);
}

function ResponsiveResponsiveDisplayEdit( props: {
	value: ResponsiveValues | undefined;
	onChange: ( newValue: ResponsiveValues ) => void;
} ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: ResponsiveValues ) => {
		onChange( {
			...value,
			...newValue,
		} );
	};
	return (
		<ResponsiveControlGrid>
			<div>
				<IconSelectControl.Desktop
					value={ value?.desktop || '' }
					options={ SELECT_OPTIONS }
					onChange={ ( newValue: string ) =>
						handleOnChange( { desktop: newValue || undefined } )
					}
				/>
			</div>
			<div>
				<IconSelectControl.Tablet
					value={ value?.tablet || '' }
					options={ SELECT_OPTIONS }
					onChange={ ( newValue: string ) => {
						handleOnChange( { tablet: newValue || undefined } );
					} }
				/>
			</div>
			<div>
				<IconSelectControl.Mobile
					value={ value?.mobile || '' }
					options={ SELECT_OPTIONS }
					onChange={ ( newValue: string ) =>
						handleOnChange( { mobile: newValue || undefined } )
					}
				/>
			</div>
		</ResponsiveControlGrid>
	);
}
