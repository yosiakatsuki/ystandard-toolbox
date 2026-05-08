/**
 * WordPress
 */
import { __ } from '@wordpress/i18n';
/**
 * Aktk Dependencies
 */
import { BorderControl } from '@aktk/block-components/components/custom-border-select';
import type {
	CustomBorder,
	FlatBorder,
	SplitBorders,
} from '@aktk/block-components/components/custom-border-select';
import {
	ResponsiveControlGrid,
	ResponsiveSelectTab,
} from '@aktk/block-components/components/tab-panel';
import { deleteUndefined } from '@aktk/block-components/utils/object';
import { isResponsiveValue } from '@aktk/block-components/utils/responsive-value';
/**
 * Plugin Dependencies
 */
import PluginSettingsBaseControl from '@aktk/plugin-settings/components/base-control';
import ClearButton from '@aktk/plugin-settings/components/clear-button';

interface BorderProps {
	value?: SplitBorders | FlatBorder;
	responsiveValue?: CustomBorder;
	onChange: ( newValue: {
		border?: SplitBorders | FlatBorder;
		responsiveBorder?: CustomBorder;
	} ) => void;
}

export default function Border( props: BorderProps ) {
	const { value, responsiveValue, onChange } = props;

	// 枠線設定更新.
	const handleDefaultChange = (
		newValue: SplitBorders | FlatBorder | undefined
	) => {
		onChange( {
			border: getNewBorderOption( newValue ),
			responsiveBorder: undefined,
		} );
	};
	const handleResponsiveChange = ( newValue: CustomBorder ) => {
		onChange( {
			border: undefined,
			responsiveBorder: deleteUndefined( newValue ) as CustomBorder,
		} );
	};

	return (
		<PluginSettingsBaseControl
			id={ 'border' }
			label={ __( '枠線', 'ystandard-toolbox' ) }
			isFullWidth={ true }
		>
			<ResponsiveSelectTab
				isResponsive={ isResponsiveValue( responsiveValue ) }
				defaultTabContent={
					<BorderControl
						value={ getDefaultBorderValue( value ) }
						onChange={ handleDefaultChange }
						enableCurrentColor={ true }
						enableTransparent={ true }
					/>
				}
				responsiveTabContent={
					<ResponsiveBorderEdit
						value={ responsiveValue || {} }
						onChange={ handleResponsiveChange }
					/>
				}
			/>
			<ClearButton
				onClick={ () =>
					onChange( {
						border: undefined,
						responsiveBorder: undefined,
					} )
				}
			/>
		</PluginSettingsBaseControl>
	);
}

function ResponsiveBorderEdit( props: {
	value: CustomBorder;
	onChange: ( newValue: CustomBorder ) => void;
} ) {
	const { value, onChange } = props;
	const handleOnChange = ( newValue: CustomBorder ) => {
		onChange( {
			...value,
			...newValue,
		} );
	};
	return (
		<ResponsiveControlGrid customClassName={ { 'md:grid-cols-3': false } }>
			<div>
				<BorderControl
					value={ value?.desktop }
					onChange={ ( newValue: SplitBorders | FlatBorder ) => {
						handleOnChange( {
							desktop: getNewBorderOption( newValue ),
						} );
					} }
					enableCurrentColor={ true }
					enableTransparent={ true }
				/>
			</div>
			<div>
				<BorderControl
					value={ value?.tablet }
					onChange={ ( newValue: SplitBorders | FlatBorder ) => {
						handleOnChange( {
							tablet: getNewBorderOption( newValue ),
						} );
					} }
					enableCurrentColor={ true }
					enableTransparent={ true }
				/>
			</div>
			<div>
				<BorderControl
					value={ value?.mobile }
					onChange={ ( newValue: SplitBorders | FlatBorder ) => {
						handleOnChange( {
							mobile: getNewBorderOption( newValue ),
						} );
					} }
					enableCurrentColor={ true }
					enableTransparent={ true }
				/>
			</div>
		</ResponsiveControlGrid>
	);
}

function getDefaultBorderValue( value?: SplitBorders | FlatBorder ) {
	if ( ! value ) {
		return value;
	}
	if ( 'desktop' in value ) {
		return ( value as unknown as CustomBorder ).desktop;
	}
	return value;
}

function getNewBorderOption(
	border?: SplitBorders | FlatBorder
): SplitBorders | FlatBorder | undefined {
	if ( ! border ) {
		return border;
	}
	// @ts-ignore
	if ( border?.color || border?.style || border?.width ) {
		return sanitizeBorder( border as FlatBorder );
	}

	// 上下左右の分割バージョン.
	Object.keys( border as SplitBorders ).forEach( ( key ) => {
		// @ts-ignore
		border[ key ] = sanitizeBorder( border[ key ] );
	} );

	return border;
}

function sanitizeBorder( border: FlatBorder ): FlatBorder {
	if ( border ) {
		// 色と幅のみの指定の場合はsolidを自動で設定する.
		if ( ! border?.style && border?.color && border?.width ) {
			border.style = 'solid';
		}
	}
	return border;
}
