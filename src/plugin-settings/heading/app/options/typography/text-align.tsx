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
import { stripUndefined } from '@aktk/block-components/utils/object';
import { isResponsiveValue } from '@aktk/block-components/utils/responsive-value';

/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';

interface TextAlignControlProps {
	value: string | undefined;
	responsiveValue: ResponsiveValues | undefined;
	onChange: ( newValue: {
		textAlign?: string;
		responsiveTextAlign?: ResponsiveValues;
	} ) => void;
}
export default function TextAlign( props: TextAlignControlProps ) {
	const { value, responsiveValue, onChange } = props;
	// 単一値モード: 単一値を更新、レスポンシブは削除.
	const handleDefaultChange = ( newValue: string | undefined ) => {
		onChange( {
			textAlign: newValue,
			responsiveTextAlign: undefined,
		} );
	};
	// レスポンシブモード: レスポンシブを更新、単一値は削除.
	const handleResponsiveChange = ( newValue: ResponsiveValues ) => {
		onChange( {
			textAlign: undefined,
			responsiveTextAlign: stripUndefined( newValue ),
		} );
	};
	return (
		<PluginSettingsBaseControl
			id={ 'text-align' }
			label={ __( '揃え位置', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<ResponsiveSelectTab
				isResponsive={ isResponsiveValue( responsiveValue ) }
				defaultTabContent={
					<DefaultTextAlignEdit
						value={ value }
						onChange={ handleDefaultChange }
					/>
				}
				responsiveTabContent={
					<ResponsiveTextAlignEdit
						value={ responsiveValue || {} }
						onChange={ handleResponsiveChange }
					/>
				}
			/>
			<ClearButton
				onClick={ () => {
					onChange( {
						textAlign: undefined,
						responsiveTextAlign: undefined,
					} );
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
	onChange: ( value: string | undefined ) => void;
} ) {
	return <TextAlignButtons value={ value } onChange={ onChange } />;
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
