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
import {
	DefaultSizeEdit,
	ResponsiveSizeEdit,
} from '@aktk/plugin-settings/heading/app/options/size/control';

interface MaxHeightControlProps {
	value: string | undefined;
	responsiveValue: ResponsiveValues | undefined;
	onChange: ( newValue: {
		maxHeight?: string;
		responsiveMaxHeight?: ResponsiveValues;
	} ) => void;
}

export default function MaxHeight( props: MaxHeightControlProps ) {
	const { value, responsiveValue, onChange } = props;
	const handleDefaultChange = ( newValue: string | undefined ) => {
		onChange( { maxHeight: newValue, responsiveMaxHeight: undefined } );
	};
	const handleResponsiveChange = ( newValue: ResponsiveValues ) => {
		onChange( {
			maxHeight: undefined,
			responsiveMaxHeight: deleteUndefined( newValue ),
		} );
	};

	return (
		<PluginSettingsBaseControl
			id={ 'max-height' }
			label={ __( '最大高さ(max-height)', 'ystandard-toolbox' ) }
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
						maxHeight: undefined,
						responsiveMaxHeight: undefined,
					} )
				}
			/>
		</PluginSettingsBaseControl>
	);
}
