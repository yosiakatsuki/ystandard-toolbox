/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import {
	ResponsiveSelectTab,
	ResponsiveControlGrid,
} from '@aktk/block-components/components/tab-panel';
import type { ResponsiveValues } from '@aktk/block-components/types';
import { deleteUndefined } from '@aktk/block-components/utils/object';
import { IconUnitControl } from '@aktk/block-components/components/icon-control';
import { isResponsiveValue } from '@aktk/block-components/utils/responsive-value';

/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';

interface BorderRadiusControlProps {
	value: string | undefined;
	responsiveValue: ResponsiveValues | undefined;
	onChange: ( newValue: {
		borderRadius?: string;
		responsiveBorderRadius?: ResponsiveValues;
	} ) => void;
}

export default function BorderRadius( props: BorderRadiusControlProps ) {
	const { value, responsiveValue, onChange } = props;
	const handleDefaultChange = ( newValue: string | undefined ) => {
		onChange( {
			borderRadius: newValue,
			responsiveBorderRadius: undefined,
		} );
	};
	const handleResponsiveChange = ( newValue: ResponsiveValues ) => {
		onChange( {
			borderRadius: undefined,
			responsiveBorderRadius: deleteUndefined( newValue ),
		} );
	};
	return (
		<PluginSettingsBaseControl
			id={ 'border-radius' }
			label={ __( '角丸', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<ResponsiveSelectTab
				isResponsive={ isResponsiveValue( responsiveValue ) }
				defaultTabContent={
					<DefaultBorderRadiusEdit
						value={ value }
						onChange={ handleDefaultChange }
					/>
				}
				responsiveTabContent={
					<ResponsiveBorderRadiusEdit
						value={ responsiveValue || {} }
						onChange={ handleResponsiveChange }
					/>
				}
			/>
			<ClearButton
				onClick={ () =>
					onChange( {
						borderRadius: undefined,
						responsiveBorderRadius: undefined,
					} )
				}
			/>
		</PluginSettingsBaseControl>
	);
}

export function DefaultBorderRadiusEdit( props: {
	value: string | undefined;
	onChange: ( newValue: string | undefined ) => void;
} ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: string ) => {
		onChange( '' === newValue ? undefined : newValue );
	};
	return <IconUnitControl value={ value } onChange={ handleOnChange } />;
}

export function ResponsiveBorderRadiusEdit( props: {
	value: ResponsiveValues;
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
				<IconUnitControl.Desktop
					value={ value.desktop }
					onChange={ ( newValue: string ) =>
						handleOnChange( { desktop: newValue || undefined } )
					}
				/>
			</div>
			<div>
				<IconUnitControl.Tablet
					value={ value.tablet }
					onChange={ ( newValue: string ) =>
						handleOnChange( { tablet: newValue || undefined } )
					}
				/>
			</div>
			<div>
				<IconUnitControl.Mobile
					value={ value.mobile }
					onChange={ ( newValue: string ) =>
						handleOnChange( { mobile: newValue || undefined } )
					}
				/>
			</div>
		</ResponsiveControlGrid>
	);
}
