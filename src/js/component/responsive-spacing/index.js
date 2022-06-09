import { _x } from '@wordpress/i18n';
import BoxControl from '@aktk/components/box-control';
import ResponsiveTab, { tabType } from '@aktk/components/responsive-tab';
import { getComponentConfig } from '@aktk/helper/config';
import {
	responsiveKeys as responsive,
	getResponsiveValue,
	parseResponsiveValues,
} from '@aktk/helper/responsive';
import {
	getSpacingInfo,
	getSpacingProps,
	parseSpacing,
} from '@aktk/helper/spacing';
import ResponsiveValuesInfo from '@aktk/components/responsive-values-info';
import { parseObject } from '@aktk/helper/object';

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
				[ responsive.desktop ]: parseSpacing( nextValues ),
			} )
		);
	};
	const handleOnChangeTablet = ( nextValues ) => {
		onChange(
			parseResponsiveValues( {
				...values,
				[ responsive.tablet ]: parseSpacing( nextValues ),
			} )
		);
	};
	const handleOnChangeMobile = ( nextValues ) => {
		onChange(
			parseResponsiveValues( {
				...values,
				[ responsive.mobile ]: parseSpacing( nextValues ),
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
				desktop={ getSpacingInfo( valueDesktop ) }
				tablet={ getSpacingInfo( valueTablet ) }
				mobile={ getSpacingInfo( valueMobile ) }
				style={ { marginTop: 0 } }
			/>
		</>
	);
};
export default ResponsiveSpacing;

const getResponsiveSpacingCustomProps = ( type, value, suffix = '' ) => {
	const prefix = '--ystdtb';
	const _suffix = suffix ? `-${ suffix }` : '';
	if ( ! value || 'object' !== typeof value ) {
		return undefined;
	}
	const getProps = ( spacing, device, isResponsive = true ) => {
		if ( ! spacing || 'object' !== typeof spacing ) {
			return undefined;
		}
		let result = {};
		Object.keys( spacing ).map( ( key ) => {
			const customProp = isResponsive
				? `${ prefix }-${ key }${ _suffix }-${ device }`
				: key;
			result = {
				...result,
				[ customProp ]: spacing[ key ],
			};
			return true;
		} );
		return result;
	};
	return {
		...getProps(
			value?.desktop,
			'desktop',
			!! ( value?.tablet || value?.mobile )
		),
		...getProps( value?.tablet, 'tablet' ),
		...getProps( value?.mobile, 'mobile' ),
	};
};

export const getResponsiveSpacingStyle = ( type, values, suffix = '' ) => {
	const parsedValue = parseResponsiveValues( {
		desktop: getSpacingProps( type, values?.desktop ),
		tablet: getSpacingProps( type, values?.tablet ),
		mobile: getSpacingProps( type, values?.mobile ),
	} );

	return parseObject(
		getResponsiveSpacingCustomProps( type, parsedValue, suffix )
	);
};
export const getResponsivePaddingStyle = ( values, suffix = '' ) => {
	return getResponsiveSpacingStyle( 'padding', values, suffix );
};
export const getResponsiveMarginStyle = ( values, suffix = '' ) => {
	return getResponsiveSpacingStyle( 'margin', values, suffix );
};
