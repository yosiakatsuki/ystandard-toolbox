/**
 * WordPress
 */
import { _x } from '@wordpress/i18n';
/**
 * yStandard
 */
import ResponsiveTab, { tabType } from '@ystd/components/responsive-tab';
import { getComponentConfig } from '@ystd/helper/config';
import {
	getResponsiveCustomProperties,
	getResponsiveValue,
	parseResponsiveValues,
	responsiveKeys as responsive,
} from '@ystd/helper/responsive';
import UnitControl from '@ystd/components/unit-control';
import ResponsiveValuesInfo from '@ystd/components/responsive-values-info';
import ButtonReset from '@ystd/components/button-reset';
import { Flex } from '@ystd/components/flex';

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

export const getResponsiveValueStyle = (
	propertyName,
	values,
	prefix = ''
) => {
	const parsedValue = parseResponsiveValues( {
		desktop: values?.desktop,
		tablet: values?.tablet,
		mobile: values?.mobile,
	} );
	return getResponsiveCustomProperties( propertyName, parsedValue, prefix );
};

export const getResponsiveWidthStyle = ( values, prefix = '' ) => {
	return getResponsiveValueStyle( 'width', values, prefix );
};
export const getResponsiveHeightStyle = ( values, prefix = '' ) => {
	return getResponsiveValueStyle( 'height', values, prefix );
};
