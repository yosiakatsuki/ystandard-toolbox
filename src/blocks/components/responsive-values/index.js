/**
 * WordPress
 */
import { _x } from '@wordpress/i18n';
/**
 * yStandard
 */
export * from './types';
export * from './utils';
import ResponsiveTab, { tabType } from '@aktk/components/responsive-tab';
import UnitControl from '@aktk/components/unit-control';
import ResponsiveValuesInfo from '@aktk/components/responsive-values-info';
import ButtonReset from '@aktk/components/button-reset';
import { Flex } from '@aktk/components/flex';
import { getResponsiveCustomProperties } from '@aktk/helper';
import { getComponentConfig } from '@aktk/helper/config';
import {
	getResponsiveValue,
	parseResponsiveValues,
	responsiveKeys as responsive,
} from '@aktk/helper/responsive';
import { parseObjectAll } from '@aktk/helper/object.js';

const ResponsiveValues = ( { label, values, onChange, units = undefined } ) => {
	const _units = units ?? getComponentConfig( 'units' );
	const valueDesktop = getResponsiveValue( values, responsive.desktop );
	const valueTablet = getResponsiveValue( values, responsive.tablet );
	const valueMobile = getResponsiveValue( values, responsive.mobile );

	const handleOnChangeDesktop = ( value ) => {
		onChange(
			parseResponsiveValues( {
				...values,
				desktop: value || undefined,
			} )
		);
	};
	const handleOnChangeTablet = ( value ) => {
		onChange(
			parseResponsiveValues( {
				...values,
				tablet: value || undefined,
			} )
		);
	};
	const handleOnChangeMobile = ( value ) => {
		onChange(
			parseResponsiveValues( {
				...values,
				mobile: value || undefined,
			} )
		);
	};
	return (
		<>
			<ResponsiveTab label={ label }>
				{ ( tab ) => {
					return (
						<>
							{ tabType.desktop === tab.name && (
								<Flex isGapSmall alignBottom>
									<UnitControl
										className={
											'ystdtb-responsive-values-unit-control'
										}
										label={ _x(
											'デスクトップ',
											'responsive-component',
											'ystandard-toolbox'
										) }
										value={ valueDesktop }
										onChange={ handleOnChangeDesktop }
										units={ _units }
										__next40pxDefaultSize
									/>
									<ButtonReset
										isDisable={ ! valueDesktop }
										onClick={ () => {
											handleOnChangeDesktop( undefined );
										} }
									/>
								</Flex>
							) }
							{ tabType.tablet === tab.name && (
								<Flex isGapSmall alignBottom>
									<UnitControl
										className={
											'ystdtb-responsive-values-unit-control'
										}
										label={ _x(
											'タブレット',
											'responsive-component',
											'ystandard-toolbox'
										) }
										value={ valueTablet }
										onChange={ handleOnChangeTablet }
										units={ _units }
										__next40pxDefaultSize
									/>
									<ButtonReset
										isDisable={ ! valueTablet }
										onClick={ () => {
											handleOnChangeTablet( undefined );
										} }
									/>
								</Flex>
							) }
							{ tabType.mobile === tab.name && (
								<Flex isGapSmall alignBottom>
									<UnitControl
										className={
											'ystdtb-responsive-values-unit-control'
										}
										label={ _x(
											'モバイル',
											'responsive-component',
											'ystandard-toolbox'
										) }
										value={ valueMobile }
										onChange={ handleOnChangeMobile }
										units={ _units }
										__next40pxDefaultSize
									/>
									<ButtonReset
										isDisable={ ! valueMobile }
										onClick={ () => {
											handleOnChangeMobile( undefined );
										} }
									/>
								</Flex>
							) }
						</>
					);
				} }
			</ResponsiveTab>
			<ResponsiveValuesInfo
				desktop={ valueDesktop }
				tablet={ valueTablet }
				mobile={ valueMobile }
			/>
		</>
	);
};
export default ResponsiveValues;

export const getResponsiveValueStyle = ( property, values, suffix = '' ) => {
	const parsedValue = parseResponsiveValues( {
		desktop: { [ property ]: values?.desktop },
		tablet: { [ property ]: values?.tablet },
		mobile: { [ property ]: values?.mobile },
	} );
	return getResponsiveCustomProperties( {
		value: parseObjectAll( parsedValue ),
		suffix,
	} );
};

export const getResponsiveWidthStyle = ( values, suffix = '' ) => {
	return getResponsiveValueStyle( 'width', values, suffix );
};
export const getResponsiveHeightStyle = ( values, suffix = '' ) => {
	return getResponsiveValueStyle( 'height', values, suffix );
};
