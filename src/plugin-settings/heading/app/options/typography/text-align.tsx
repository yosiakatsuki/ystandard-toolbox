/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';

/**
 * Aktk Dependencies
 */
import {
	DesktopTextAlignSelect,
	MobileTextAlignSelect,
	TabletTextAlignSelect,
	TextAlignButtons,
} from '@aktk/block-components/components/alignment-control';
import {
	ResponsiveSelectTab,
	ResponsiveControlGrid,
} from '@aktk/block-components/components/tab-panel';
import type { ResponsiveValues } from '@aktk/block-components/types';
import { deleteUndefined } from '@aktk/block-components/utils/object';
/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';
import { isResponsiveHeadingOption } from '@aktk/plugin-settings/heading/app/options/util';

interface TextAlignControlProps {
	value: ResponsiveValues | undefined;
	onChange: ( newValue: { textAlign?: ResponsiveValues } ) => void;
}
export default function TextAlign( props: TextAlignControlProps ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: ResponsiveValues ) => {
		onChange( {
			textAlign: deleteUndefined( newValue ),
		} );
	};
	return (
		<PluginSettingsBaseControl
			id={ 'text-align' }
			label={ __( '揃え位置', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<ResponsiveSelectTab
				isResponsive={ isResponsiveHeadingOption( value ) }
				defaultTabContent={
					<DefaultTextAlignEdit
						value={ value?.desktop }
						onChange={ handleOnChange }
					/>
				}
				responsiveTabContent={
					<ResponsiveTextAlignEdit
						value={ value || {} }
						onChange={ handleOnChange }
					/>
				}
			/>
			<ClearButton
				onClick={ () => {
					onChange( { textAlign: undefined } );
				} }
			/>
		</PluginSettingsBaseControl>
	);
}

/**
 * デバイス共通設定
 * @param value.value
 * @param value
 * @param onChange
 * @param value.onChange
 * @class
 */
function DefaultTextAlignEdit( {
	value,
	onChange,
}: {
	value: string | undefined;
	onChange: ( value: ResponsiveValues ) => void;
} ) {
	const handleOnChange = ( newValue: string | undefined ) => {
		// 共通設定の場合、tablet,mobileは削除
		onChange( {
			desktop: newValue,
			tablet: undefined,
			mobile: undefined,
		} );
	};
	return <TextAlignButtons value={ value } onChange={ handleOnChange } />;
}

function ResponsiveTextAlignEdit( {
	value,
	onChange,
}: {
	value: ResponsiveValues;
	onChange: ( value: ResponsiveValues ) => void;
} ) {
	const handleOnChange = ( newValue: ResponsiveValues ) => {
		onChange( {
			...value,
			...newValue,
		} );
	};
	return (
		<ResponsiveControlGrid>
			<div>
				<DesktopTextAlignSelect
					value={ value.desktop || '' }
					onChange={ ( newValue ) => {
						handleOnChange( { desktop: newValue || undefined } );
					} }
				/>
			</div>
			<div>
				<TabletTextAlignSelect
					value={ value.tablet || '' }
					onChange={ ( newValue ) => {
						handleOnChange( { tablet: newValue || undefined } );
					} }
				/>
			</div>
			<div>
				<MobileTextAlignSelect
					value={ value.mobile || '' }
					onChange={ ( newValue ) => {
						handleOnChange( { mobile: newValue || undefined } );
					} }
				/>
			</div>
		</ResponsiveControlGrid>
	);
}
