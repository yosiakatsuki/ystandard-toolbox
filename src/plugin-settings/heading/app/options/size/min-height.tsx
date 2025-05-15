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

interface MinHeightControlProps {
	value: ResponsiveValues | undefined;
	onChange: ( newValue: { minHeight?: ResponsiveValues } ) => void;
}

export default function MinHeight( props: MinHeightControlProps ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: ResponsiveValues ) => {
		onChange( { minHeight: deleteUndefined( newValue ) } );
	};

	return (
		<PluginSettingsBaseControl
			id={ 'min-height' }
			label={ __( '最小高さ(min-height)', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<ResponsiveSelectTab
				isResponsive={ isResponsiveHeadingOption( value ) }
				defaultTabContent={
					<DefaultSizeEdit
						value={ value?.desktop }
						onChange={ handleOnChange }
					/>
				}
				responsiveTabContent={
					<ResponsiveSizeEdit
						value={ value || {} }
						onChange={ handleOnChange }
					/>
				}
			/>
			<ClearButton
				onClick={ () => onChange( { minHeight: undefined } ) }
			/>
		</PluginSettingsBaseControl>
	);
}
