import { _x } from '@wordpress/i18n';

import ResponsiveTab, { tabType } from "@ystdtb/components/responsive-tab";
import { getComponentConfig } from "@ystdtb/helper/config";
import {
	getResponsiveValue,
	parseResponsiveValues,
	responsiveKeys as responsive
} from "@ystdtb/helper/responsive";
import UnitControl from "@ystdtb/components/unit-control";

const ResponsiveValues = ( { label, values, onChange, units = undefined } ) => {

	const _units = units ?? getComponentConfig( 'units' );
	const valueDesktop = getResponsiveValue( values, responsive.desktop );
	const valueTablet = getResponsiveValue( values, responsive.tablet );
	const valueMobile = getResponsiveValue( values, responsive.mobile );


	const handleOnChangeDesktop = ( value ) => {
		onChange( parseResponsiveValues( {
			...values,
			desktop: value || undefined,
		} ) );
	};
	const handleOnChangeTablet = ( value ) => {
		onChange( parseResponsiveValues( {
			...values,
			tablet: value || undefined,
		} ) );
	};
	const handleOnChangeMobile = ( value ) => {
		onChange( parseResponsiveValues( {
			...values,
			mobile: value || undefined,
		} ) );
	};
	return (
		<ResponsiveTab
			label={ label }
		>
			{ ( tab ) => {
				return (
					<>
						{ ( tabType.desktop === tab.name &&
							<UnitControl
								className={ 'ystdtb-responsive-values-unit-control' }
								label={ _x( 'デスクトップ', 'responsive-component', 'ystandard-toolbox' ) }
								value={ valueDesktop }
								onChange={ handleOnChangeDesktop }
								units={ _units }
							/>
						) }
						{ ( tabType.tablet === tab.name &&
							<UnitControl
								className={ 'ystdtb-responsive-values-unit-control' }
								label={ _x( 'タブレット', 'responsive-component', 'ystandard-toolbox' ) }
								value={ valueTablet }
								onChange={ handleOnChangeTablet }
								units={ _units }
							/>
						) }
						{ ( tabType.mobile === tab.name &&
							<UnitControl
								className={ 'ystdtb-responsive-values-unit-control' }
								label={ _x( 'モバイル', 'responsive-component', 'ystandard-toolbox' ) }
								value={ valueMobile }
								onChange={ handleOnChangeMobile }
								units={ _units }
							/>
						) }
					</>
				);
			} }
		</ResponsiveTab>
	);
}
export default ResponsiveValues;
