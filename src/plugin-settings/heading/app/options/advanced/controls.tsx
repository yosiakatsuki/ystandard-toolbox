/**
 * Aktk Dependencies
 */
import CustomSelectControl, {
	type CustomSelectControlOption,
} from '@aktk/block-components/wp-controls/custom-select-control';
import {
	ResponsiveControlGrid,
	ResponsiveSelectTab,
} from '@aktk/block-components/components/tab-panel';
/**
 * Plugin Dependencies
 */
import type { ResponsiveValues } from '@aktk/block-components/types';
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';
import { isResponsiveHeadingOption } from '@aktk/plugin-settings/heading/app/options/util';
import { IconSelectControl } from '@aktk/block-components/components/icon-control';

interface AdvancedResponsiveSelectControlProps {
	id: string;
	label: string;
	value: ResponsiveValues | undefined;
	onChange: ( newValue: ResponsiveValues ) => void;
	onClear: () => void;
	options: CustomSelectControlOption[];
}
interface AdvancedResponsiveSelectEditProps {
	value: ResponsiveValues | undefined;
	onChange: ( newValue: ResponsiveValues ) => void;
	options: CustomSelectControlOption[];
}

export function AdvancedResponsiveSelectControl(
	props: AdvancedResponsiveSelectControlProps
) {
	const { id, label, value, onChange, onClear, options } = props;
	const handleOnChange = ( newValue: ResponsiveValues ) => {
		onChange( newValue );
	};
	return (
		<PluginSettingsBaseControl
			id={ id }
			label={ label }
			isFullWidth={ true }
		>
			<ResponsiveSelectTab
				isResponsive={ isResponsiveHeadingOption( value ) }
				defaultTabContent={
					<DesktopResponsiveSelectEdit
						value={ value }
						onChange={ handleOnChange }
						options={ options }
					/>
				}
				responsiveTabContent={
					<ResponsiveResponsiveSelectControl
						value={ value }
						onChange={ handleOnChange }
						options={ options }
					/>
				}
			/>
			<ClearButton onClick={ onClear } />
		</PluginSettingsBaseControl>
	);
}

function DesktopResponsiveSelectEdit(
	props: AdvancedResponsiveSelectEditProps
) {
	const { value, onChange, options } = props;
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
			options={ options }
			onChange={ handleOnSelectChange }
		/>
	);
}

function ResponsiveResponsiveSelectControl(
	props: AdvancedResponsiveSelectEditProps
) {
	const { value, onChange, options } = props;
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
					options={ options }
					onChange={ ( newValue: string ) =>
						handleOnChange( { desktop: newValue || undefined } )
					}
				/>
			</div>
			<div>
				<IconSelectControl.Tablet
					value={ value?.tablet || '' }
					options={ options }
					onChange={ ( newValue: string ) => {
						handleOnChange( { tablet: newValue || undefined } );
					} }
				/>
			</div>
			<div>
				<IconSelectControl.Mobile
					value={ value?.mobile || '' }
					options={ options }
					onChange={ ( newValue: string ) =>
						handleOnChange( { mobile: newValue || undefined } )
					}
				/>
			</div>
		</ResponsiveControlGrid>
	);
}
