/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';

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
import BaseControl from '@aktk/plugin-settings/components/base-control';
/**
 * Context
 */
import { HeadingContext } from '../index';

export default function TextAlign() {
	// @ts-ignore
	const { headingOption, setHeadingOption, setIsEdit } =
		useContext( HeadingContext );
	const handleOnChange = ( newValue: ResponsiveValues ) => {
		// @ts-ignore
		setHeadingOption( {
			...headingOption,
			style: {
				...headingOption?.style,
				textAlign: deleteUndefined( newValue ),
			},
		} );
		setIsEdit( true );
	};
	return (
		<BaseControl
			id={ 'text-align' }
			label={ __( '揃え位置', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<ResponsiveSelectTab
				defaultTabContent={
					<DefaultTextAlignEdit
						value={ headingOption?.style?.textAlign?.desktop }
						onChange={ handleOnChange }
					/>
				}
				responsiveTabContent={
					<ResponsiveTextAlignEdit
						value={ headingOption?.style?.textAlign || {} }
						onChange={ handleOnChange }
					/>
				}
			/>
		</BaseControl>
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
						handleOnChange( { desktop: newValue } );
					} }
				/>
			</div>
			<div>
				<TabletTextAlignSelect
					value={ value.tablet || '' }
					onChange={ ( newValue ) => {
						handleOnChange( { tablet: newValue } );
					} }
				/>
			</div>
			<div>
				<MobileTextAlignSelect
					value={ value.mobile || '' }
					onChange={ ( newValue ) => {
						handleOnChange( { mobile: newValue } );
					} }
				/>
			</div>
		</ResponsiveControlGrid>
	);
}
