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
import { IconFontWeightControl } from '@aktk/block-components/components/icon-control';
import { FontWeightControl } from '@aktk/block-components/wp-controls/font-appearance-control';
import { deleteUndefined } from '@aktk/block-components/utils/object';

/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';
import { isResponsiveHeadingOption } from '@aktk/plugin-settings/heading/app/options/util';

interface FontWeightControlProps {
	value: string | undefined;
	responsiveValue: ResponsiveValues | undefined;
	onChange: ( newValue: {
		fontWeight?: string;
		responsiveFontWeight?: ResponsiveValues;
	} ) => void;
}

interface FontWeightEditProps {
	value: ResponsiveValues | undefined;
	onChange: ( newValue: ResponsiveValues ) => void;
}

export default function FontWeight( props: FontWeightControlProps ) {
	const { value, responsiveValue, onChange } = props;

	// 単一値モード: 単一値を更新、レスポンシブは削除.
	const handleDefaultChange = ( newValue: string | undefined ) => {
		onChange( {
			fontWeight: newValue,
			responsiveFontWeight: undefined,
		} );
	};
	// レスポンシブモード: レスポンシブを更新、単一値は削除.
	const handleResponsiveChange = ( newValue: ResponsiveValues ) => {
		onChange( {
			fontWeight: undefined,
			responsiveFontWeight: deleteUndefined( {
				...responsiveValue,
				...newValue,
			} ),
		} );
	};
	return (
		<PluginSettingsBaseControl
			id={ 'font-weight' }
			label={ __( '文字太さ', 'ystandard-toolbox' ) }
			isFullWidth={ true }
			className={ '[&_.components-custom-select-control__label]:hidden' }
		>
			<ResponsiveSelectTab
				isResponsive={ isResponsiveHeadingOption( responsiveValue ) }
				defaultTabContent={
					<DefaultFontWeightEdit
						value={ value }
						onChange={ handleDefaultChange }
					/>
				}
				responsiveTabContent={
					<ResponsiveFontWeightEdit
						value={ responsiveValue }
						onChange={ handleResponsiveChange }
					/>
				}
			/>
			<ClearButton
				onClick={ () =>
					onChange( {
						fontWeight: undefined,
						responsiveFontWeight: undefined,
					} )
				}
			/>
		</PluginSettingsBaseControl>
	);
}

export function DefaultFontWeightEdit( {
	value,
	onChange,
}: {
	value: string | undefined;
	onChange: ( value: string | undefined ) => void;
} ) {
	const handleOnChange = ( newValue: string ) => {
		onChange( newValue || undefined );
	};
	return (
		<FontWeightControl value={ value || '' } onChange={ handleOnChange } />
	);
}

export function ResponsiveFontWeightEdit( props: FontWeightEditProps ) {
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
				<IconFontWeightControl.Desktop
					value={ value?.desktop || '' }
					onChange={ ( newValue: string ) =>
						handleOnChange( { desktop: newValue || undefined } )
					}
				/>
			</div>
			<div>
				<IconFontWeightControl.Tablet
					value={ value?.tablet || '' }
					onChange={ ( newValue: string ) =>
						handleOnChange( { tablet: newValue || undefined } )
					}
				/>
			</div>
			<div>
				<IconFontWeightControl.Mobile
					value={ value?.mobile || '' }
					onChange={ ( newValue: string ) =>
						handleOnChange( { mobile: newValue || undefined } )
					}
				/>
			</div>
		</ResponsiveControlGrid>
	);
}
