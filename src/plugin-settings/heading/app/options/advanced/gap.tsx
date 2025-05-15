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
/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';
import { isResponsiveHeadingOption } from '@aktk/plugin-settings/heading/app/options/util';
import { isUseFlex } from '@aktk/plugin-settings/heading/app/options/advanced/utils';

interface GapControlProps {
	value: ResponsiveValues | undefined;
	onChange: ( newValue: { gap?: ResponsiveValues } ) => void;
	displayValue: ResponsiveValues | undefined;
}

export default function Gap( props: GapControlProps ) {
	const { value, onChange, displayValue } = props;
	const handleOnChange = ( newValue: ResponsiveValues ) => {
		onChange( {
			gap: deleteUndefined( newValue ),
		} );
	};
	// flexが選択されていない場合は非表示.
	if ( ! isUseFlex( displayValue ) ) {
		return <></>;
	}
	return (
		<PluginSettingsBaseControl
			id={ 'gap' }
			label={ __( 'gap', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<ResponsiveSelectTab
				isResponsive={ isResponsiveHeadingOption( value ) }
				defaultTabContent={
					<DefaultGapEdit
						value={ value?.desktop }
						onChange={ handleOnChange }
					/>
				}
				responsiveTabContent={
					<ResponsiveGapEdit
						value={ value || {} }
						onChange={ handleOnChange }
					/>
				}
			/>
			<ClearButton onClick={ () => onChange( { gap: undefined } ) } />
		</PluginSettingsBaseControl>
	);
}

export function DefaultGapEdit( props: {
	value: string | undefined;
	onChange: ( newValue: ResponsiveValues ) => void;
} ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: string ) => {
		onChange( {
			desktop: '' === newValue ? undefined : newValue,
			tablet: undefined,
			mobile: undefined,
		} );
	};
	return <IconUnitControl value={ value } onChange={ handleOnChange } />;
}

export function ResponsiveGapEdit( props: {
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
