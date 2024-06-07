/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
/**
 * Aktk Dependencies
 */
import {
	ResponsiveSelectTab,
	ResponsiveControlGrid,
} from '@aktk/block-components/components/tab-panel';
import { FontWeightControl } from '@aktk/block-components/wp-controls/font-appearance-control';
import type { ResponsiveValues } from '@aktk/block-components/types';
import { IconFontWeightControl } from '@aktk/block-components/components/icon-control';
/**
 * Plugin Dependencies
 */
import BaseControl from '@aktk/plugin-settings/components/base-control';
/**
 * Context
 */
import { HeadingContext } from '../index';

interface FontWeightProps {
	value: ResponsiveValues | undefined;
	onChange: ( newValue: ResponsiveValues ) => void;
}

export default function FontWeight() {
	// @ts-ignore
	const { headingOption, setHeadingOption, setIsEdit } =
		useContext( HeadingContext );
	const handleOnChange = ( newValue: ResponsiveValues ) => {
		// @ts-ignore
		setHeadingOption( {
			...headingOption,
			style: {
				...headingOption?.style,
				fontWeight: newValue,
			},
		} );
		setIsEdit( true );
	};

	return (
		<BaseControl
			id={ 'font-weight' }
			label={ __( '文字太さ', 'ystandard-toolbox' ) }
			isFullWidth={ true }
			className={ '[&_.components-custom-select-control__label]:hidden' }
		>
			<ResponsiveSelectTab
				defaultTabContent={
					<DefaultFontWeightEdit
						value={ headingOption?.style?.fontWeight }
						onChange={ handleOnChange }
					/>
				}
				responsiveTabContent={
					<ResponsiveFontWeightEdit
						value={ headingOption?.style?.fontWeight }
						onChange={ handleOnChange }
					/>
				}
			/>
		</BaseControl>
	);
}

export function DefaultFontWeightEdit( props: FontWeightProps ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: string ) => {
		onChange( {
			desktop: newValue,
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

export function ResponsiveFontWeightEdit( props: FontWeightProps ) {
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
						handleOnChange( { desktop: newValue } )
					}
				/>
			</div>
			<div>
				<IconFontWeightControl.Tablet
					value={ value?.tablet || '' }
					onChange={ ( newValue: string ) =>
						handleOnChange( { tablet: newValue } )
					}
				/>
			</div>
			<div>
				<IconFontWeightControl.Mobile
					value={ value?.mobile || '' }
					onChange={ ( newValue: string ) =>
						handleOnChange( { mobile: newValue } )
					}
				/>
			</div>
		</ResponsiveControlGrid>
	);
}
