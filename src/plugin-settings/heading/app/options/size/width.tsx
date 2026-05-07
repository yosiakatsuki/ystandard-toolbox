/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import { ResponsiveSelectTab } from '@aktk/block-components/components/tab-panel';
import type { ResponsiveValues } from '@aktk/block-components/types';
import { deleteUndefined } from '@aktk/block-components/utils/object';

/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';
import { isResponsiveHeadingOption } from '@aktk/plugin-settings/heading/app/options/util';
import { DefaultSizeEdit, ResponsiveSizeEdit } from './control';

interface WidthControlProps {
	value: string | undefined;
	responsiveValue: ResponsiveValues | undefined;
	onChange: ( newValue: {
		width?: string;
		responsiveWidth?: ResponsiveValues;
	} ) => void;
}

export default function Width( props: WidthControlProps ) {
	const { value, responsiveValue, onChange } = props;
	const handleDefaultChange = ( newValue: string | undefined ) => {
		onChange( { width: newValue, responsiveWidth: undefined } );
	};
	const handleResponsiveChange = ( newValue: ResponsiveValues ) => {
		onChange( {
			width: undefined,
			responsiveWidth: deleteUndefined( newValue ),
		} );
	};

	return (
		<PluginSettingsBaseControl
			id={ 'width' }
			label={ __( '横幅(width)', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<ResponsiveSelectTab
				isResponsive={ isResponsiveHeadingOption( responsiveValue ) }
				defaultTabContent={
					<DefaultSizeEdit
						value={ value }
						onChange={ handleDefaultChange }
					/>
				}
				responsiveTabContent={
					<ResponsiveSizeEdit
						value={ responsiveValue || {} }
						onChange={ handleResponsiveChange }
					/>
				}
			/>
			<ClearButton
				onClick={ () =>
					onChange( {
						width: undefined,
						responsiveWidth: undefined,
					} )
				}
			/>
		</PluginSettingsBaseControl>
	);
}
