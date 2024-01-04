import { _x } from '@wordpress/i18n';
import { FontSizePicker } from '@wordpress/block-editor';
import UnitControl from '@ystd/components/unit-control';
import ResponsiveTab, { tabType } from '@ystd/components/responsive-tab';
import {
	responsiveKeys as responsive,
	getResponsiveValue,
	parseResponsiveValues,
	getResponsiveCustomProperties,
} from '@ystd/helper/responsive';
import { getComponentConfig } from '@ystd/helper/config';
import { createFontSizeObject, getFontSizeValue } from '@ystd/helper/fontSize';
import ResponsiveValuesInfo from '@ystd/components/responsive-values-info';
import ButtonReset from '@ystd/components/button-reset';
import { Flex } from '@ystd/components/flex';

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
