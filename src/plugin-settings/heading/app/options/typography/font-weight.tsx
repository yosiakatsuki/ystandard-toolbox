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
import BaseControl from '@aktk/plugin-settings/components/base-control';
import { isResponsiveHeadingOption } from '@aktk/plugin-settings/heading/app/options/util';

interface FontWeightControlProps {
	value: ResponsiveValues | undefined;
	onChange: ( newValue: { fontWeight: ResponsiveValues } ) => void;
}

interface FontWeightEditProps {
	value: ResponsiveValues | undefined;
	onChange: ( newValue: ResponsiveValues ) => void;
}

export default function FontWeight( props: FontWeightControlProps ) {
	const { value, onChange } = props;

	const handleOnChange = ( newValue: ResponsiveValues ) => {
		onChange( {
			fontWeight: deleteUndefined( {
				...value,
				...newValue,
			} ),
		} );
	};
	return (
		<BaseControl
			id={ 'font-weight' }
			label={ __( '文字太さ', 'ystandard-toolbox' ) }
			isFullWidth={ true }
			className={ '[&_.components-custom-select-control__label]:hidden' }
		>
			<ResponsiveSelectTab
				isResponsive={ isResponsiveHeadingOption( value ) }
				defaultTabContent={
					<DefaultFontWeightEdit
						value={ value }
						onChange={ handleOnChange }
					/>
				}
				responsiveTabContent={
					<ResponsiveFontWeightEdit
						value={ value }
						onChange={ handleOnChange }
					/>
				}
			/>
		</BaseControl>
	);
}

export function DefaultFontWeightEdit( props: FontWeightEditProps ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: string ) => {
		onChange( {
			desktop: newValue || undefined,
			tablet: undefined,
			mobile: undefined,
		} );
	};
	return (
		<FontWeightControl
			value={ value?.desktop || '' }
			onChange={ handleOnChange }
		/>
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
