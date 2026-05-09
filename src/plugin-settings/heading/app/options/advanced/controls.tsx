/**
 * Aktk Dependencies
 */
import {
	CustomSelectControl,
	type CustomSelectControlOption,
} from '@aktk/block-components/components/custom-select-control';
import {
	ResponsiveControlGrid,
	ResponsiveSelectTab,
} from '@aktk/block-components/components/tab-panel';
import { isResponsiveValue } from '@aktk/block-components/utils/responsive-value';
import type { ResponsiveValues } from '@aktk/block-components/types';
import { IconSelectControl } from '@aktk/block-components/components/icon-control';

/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';


interface AdvancedResponsiveSelectControlProps {
	id: string;
	label: string;
	value: string | undefined;
	responsiveValue: ResponsiveValues | undefined;
	onDefaultChange: ( newValue: string | undefined ) => void;
	onResponsiveChange: ( newValue: ResponsiveValues ) => void;
	onClear: () => void;
	options: CustomSelectControlOption[];
}

export function AdvancedResponsiveSelectControl(
	props: AdvancedResponsiveSelectControlProps
) {
	const {
		id,
		label,
		value,
		responsiveValue,
		onDefaultChange,
		onResponsiveChange,
		onClear,
		options,
	} = props;
	return (
		<PluginSettingsBaseControl
			id={ id }
			label={ label }
			isFullWidth={ true }
		>
			<ResponsiveSelectTab
				isResponsive={ isResponsiveValue( responsiveValue ) }
				defaultTabContent={
					<DesktopResponsiveSelectEdit
						value={ value }
						onChange={ onDefaultChange }
						options={ options }
					/>
				}
				responsiveTabContent={
					<ResponsiveResponsiveSelectControl
						value={ responsiveValue }
						onChange={ onResponsiveChange }
						options={ options }
					/>
				}
			/>
			<ClearButton onClick={ onClear } />
		</PluginSettingsBaseControl>
	);
}

function DesktopResponsiveSelectEdit( props: {
	value: string | undefined;
	onChange: ( newValue: string | undefined ) => void;
	options: CustomSelectControlOption[];
} ) {
	const { value, onChange, options } = props;
	const handleOnSelectChange = ( newValue: string ) => {
		onChange( '' === newValue ? undefined : newValue );
	};
	return (
		<CustomSelectControl
			value={ value || '' }
			options={ options }
			onChange={ handleOnSelectChange }
		/>
	);
}

function ResponsiveResponsiveSelectControl( props: {
	value: ResponsiveValues | undefined;
	onChange: ( newValue: ResponsiveValues ) => void;
	options: CustomSelectControlOption[];
} ) {
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
