import { _x } from '@wordpress/i18n';
import BoxControl from '@ystd/components/box-control';
import ResponsiveTab, { tabType } from '@ystd/components/responsive-tab';
import { getComponentConfig } from '@ystd/helper/config';
import {
	responsiveKeys as responsive,
	getResponsiveValue,
	parseResponsiveValues,
	getResponsiveCustomProperties,
} from '@ystd/helper/responsive';
import { getSpacing, getSpacingCSS } from '@ystd/helper/spacing';
import ResponsiveValuesInfo from "@ystd/components/responsive-values-info";

const ResponsiveSpacing = ( props ) => {
	const { label, values, onChange, units, inputProps } = props;

	const _units = units ?? getComponentConfig( 'units' );
	const valueDesktop = getResponsiveValue( values, responsive.desktop );
	const valueTablet = getResponsiveValue( values, responsive.tablet );
	const valueMobile = getResponsiveValue( values, responsive.mobile );

	const handleOnChangeDesktop = ( nextValues ) => {
		onChange(
			parseResponsiveValues( {
				...values,
				[ responsive.desktop ]: getSpacing( nextValues ),
			} )
		);
	};
	const handleOnChangeTablet = ( nextValues ) => {
		onChange(
			parseResponsiveValues( {
				...values,
				[ responsive.tablet ]: getSpacing( nextValues ),
			} )
		);
	};
	const handleOnChangeMobile = ( nextValues ) => {
		onChange(
			parseResponsiveValues( {
				...values,
				[ responsive.mobile ]: getSpacing( nextValues ),
			} )
		);
	};
	console.log( {
		valueDesktop,
		valueTablet,
		valueMobile
	} )
	return (
		<>
			<ResponsiveTab label={ label }>
				{ ( tab ) => {
					return (
						<>
							{ tabType.desktop === tab.name && (
								<div
									className={
										'ystdtb-responsive-spacing-box-control'
									}
								>
									<BoxControl
										label={ _x(
											'デスクトップ',
											'responsive-component',
											'ystandard-toolbox'
										) }
										values={ valueDesktop }
										onChange={ handleOnChangeDesktop }
										units={ _units }
										inputProps={ inputProps }
									/>
								</div>
							) }
							{ tabType.tablet === tab.name && (
								<div
									className={
										'ystdtb-responsive-spacing-box-control'
									}
								>
									<BoxControl
										label={ _x(
											'タブレット',
											'responsive-component',
											'ystandard-toolbox'
										) }
										values={ valueTablet }
										onChange={ handleOnChangeTablet }
										units={ _units }
										inputProps={ inputProps }
									/>
								</div>
							) }
							{ tabType.mobile === tab.name && (
								<div
									className={
										'ystdtb-responsive-spacing-box-control'
									}
								>
									<BoxControl
										label={ _x(
											'モバイル',
											'responsive-component',
											'ystandard-toolbox'
										) }
										values={ valueMobile }
										onChange={ handleOnChangeMobile }
										units={ _units }
										inputProps={ inputProps }
									/>
								</div>
							) }
						</>
					);
				} }
			</ResponsiveTab>
			<ResponsiveValuesInfo
				desktop={ getSpacingCSS( valueDesktop ) }
				tablet={ getSpacingCSS( valueTablet ) }
				mobile={ getSpacingCSS( valueMobile ) }
				style={ { marginTop: 0 } }
			/>
		</>
	);
};
export default ResponsiveSpacing;

export const getResponsiveSpacingStyle = ( propertyName, prefix, values ) => {
	const parsedValue = parseResponsiveValues( {
		desktop: getSpacingCSS( values?.desktop ),
		tablet: getSpacingCSS( values?.tablet ),
		mobile: getSpacingCSS( values?.mobile ),
	} );
	return getResponsiveCustomProperties( propertyName, prefix, parsedValue );
};
export const getResponsivePaddingStyle = ( prefix, values ) => {
	return getResponsiveSpacingStyle( 'padding', prefix, values );
};
export const getResponsiveMarginStyle = ( prefix, values ) => {
	return getResponsiveSpacingStyle( 'margin', prefix, values );
};
