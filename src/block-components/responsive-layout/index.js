/**
 * WordPress
 */
import { _x, __ } from '@wordpress/i18n';
/**
 * Plugin.
 */
import ResponsiveTab from '@aktk/components/responsive-tab';
import ResponsiveValuesInfo from '@aktk/components/responsive-values-info';
import LayoutControl, {
	getLayoutStyles,
} from '@aktk/components/layout-control';
import {
	getResponsiveValue,
	parseResponsiveValues,
	responsiveKeys as responsive,
} from '@aktk/helper/responsive';
import { isObject, parseObject } from '@aktk/helper/object.js';
import { getResponsiveCustomProperties } from '@aktk/helper';
import './_editor.scss';

const ResponsiveLayout = ( { label, values, onChange } ) => {
	const layoutControlProps = {
		[ responsive.desktop ]: {
			label: _x(
				'デスクトップ',
				'responsive-component',
				'ystandard-toolbox'
			),
			layout: getResponsiveValue( values, responsive.desktop ),
			onChange: ( newValue ) => {
				onChange(
					parseResponsiveValues( {
						...values,
						desktop: newValue || undefined,
					} )
				);
			},
		},
		[ responsive.tablet ]: {
			label: _x(
				'タブレット',
				'responsive-component',
				'ystandard-toolbox'
			),
			layout: getResponsiveValue( values, responsive.tablet ),
			onChange: ( newValue ) => {
				onChange(
					parseResponsiveValues( {
						...values,
						tablet: newValue || undefined,
					} )
				);
			},
		},
		[ responsive.mobile ]: {
			label: _x(
				'モバイル',
				'responsive-component',
				'ystandard-toolbox'
			),
			layout: getResponsiveValue( values, responsive.mobile ),
			onChange: ( newValue ) => {
				onChange(
					parseResponsiveValues( {
						...values,
						mobile: newValue || undefined,
					} )
				);
			},
		},
	};
	return (
		<>
			<ResponsiveTab label={ label }>
				{ ( tab ) => {
					return (
						<LayoutControl
							className={ 'aktk-component-responsive-layout' }
							{ ...layoutControlProps[ tab.name ] }
						/>
					);
				} }
			</ResponsiveTab>
			<ResponsiveValuesInfo
				desktop={
					layoutControlProps[ responsive.desktop ]?.layout
						? __( '設定あり', 'ystandard-toolbox' )
						: undefined
				}
				tablet={
					layoutControlProps[ responsive.tablet ]?.layout
						? __( '設定あり', 'ystandard-toolbox' )
						: undefined
				}
				mobile={
					layoutControlProps[ responsive.mobile ]?.layout
						? __( '設定あり', 'ystandard-toolbox' )
						: undefined
				}
			/>
		</>
	);
};
export default ResponsiveLayout;

const getResponsiveLayoutCustomProperty = ( values, suffix = '' ) => {
	if ( ! isObject( values ) ) {
		return undefined;
	}
	const parsedValue = parseResponsiveValues( {
		desktop: getLayoutStyles( values?.desktop ),
		tablet: getLayoutStyles( values?.tablet ),
		mobile: getLayoutStyles( values?.mobile ),
	} );
	return getResponsiveCustomProperties( {
		value: parsedValue,
		suffix,
	} );
};

export const getResponsiveLayoutStyle = ( values, suffix = '' ) => {
	return parseObject( getResponsiveLayoutCustomProperty( values, suffix ) );
};
