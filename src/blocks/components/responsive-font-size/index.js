import { _x } from '@wordpress/i18n';
import { FontSizePicker } from '@wordpress/block-editor';
import UnitControl from '@aktk/components/unit-control';
import ResponsiveTab, { tabType } from '@aktk/components/responsive-tab';
import {
	responsiveKeys as responsive,
	getResponsiveValue,
	parseResponsiveValues,
	getResponsiveCustomProperties,
} from '@aktk/helper/responsive';
import { getComponentConfig } from '@aktk/helper/config';
import { createFontSizeObject, getFontSizeValue } from '@aktk/helper/fontSize';
import ResponsiveValuesInfo from '@aktk/components/responsive-values-info';
import ButtonReset from '@aktk/components/button-reset';
import { Flex } from '@aktk/components/flex';

const ResponsiveFontSize = ( props ) => {
	const { label, values, onChange, units } = props;

	const _units = units ?? getComponentConfig( 'fontSizeUnits' );
	const valueDesktop = getFontSizeValue(
		getResponsiveValue( values, responsive.desktop )
	);
	const valueTablet = getResponsiveValue( values, responsive.tablet );
	const valueMobile = getResponsiveValue( values, responsive.mobile );

	const handleOnChangeDesktop = ( value ) => {
		onChange(
			parseResponsiveValues( {
				...values,
				[ responsive.desktop ]: createFontSizeObject( value ),
			} )
		);
	};
	const handleOnChangeTablet = ( value ) => {
		onChange(
			parseResponsiveValues( {
				...values,
				[ responsive.tablet ]: value,
			} )
		);
	};
	const handleOnChangeMobile = ( value ) => {
		onChange(
			parseResponsiveValues( {
				...values,
				[ responsive.mobile ]: value,
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
								<div
									className={
										'ystdtb-responsive-font-size-unit-control'
									}
								>
									<FontSizePicker
										label={ _x(
											'デスクトップ',
											'responsive-component',
											'ystandard-toolbox'
										) }
										value={ valueDesktop }
										onChange={ handleOnChangeDesktop }
										__nextHasNoMarginBottom
										__next40pxDefaultSize
									/>
								</div>
							) }
							{ tabType.tablet === tab.name && (
								<Flex isGapSmall alignBottom>
									<UnitControl
										className={
											'ystdtb-responsive-font-size-unit-control'
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
											'ystdtb-responsive-font-size-unit-control'
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
export default ResponsiveFontSize;

export const getResponsiveFontSizeStyle = (
	fontSize,
	fontSizeClass = false
) => {
	const value = {
		desktop: fontSize?.desktop?.size,
		tablet: fontSize?.tablet,
		mobile: fontSize?.mobile,
	};
	return getResponsiveCustomProperties(
		'font-size',
		parseResponsiveValues( value ),
		'',
		!! fontSizeClass
	);
};
