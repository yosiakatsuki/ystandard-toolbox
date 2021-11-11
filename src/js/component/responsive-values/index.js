import { _x } from '@wordpress/i18n';

import ResponsiveTab, { tabType } from "@ystdtb/components/responsive-tab";
import { getComponentConfig } from "@ystdtb/helper/config";
import { getResponsiveProperty, responsiveKeys as responsive } from "@ystdtb/helper/responsive";
import UnitControl from "@ystdtb/components/unit-control";

const ResponsiveValues = ( { label, values, onChange, units = undefined } ) => {

	const _units = units ?? getComponentConfig( 'units' );
	const valueDesktop = getResponsiveProperty( values, responsive.desktop );
	const valueTablet = getResponsiveProperty( values, responsive.tablet );
	const valueMobile = getResponsiveProperty( values, responsive.mobile );
	const handleOnChangeDesktop = ( value ) => {
		onChange( {
			...values,
			[ responsive.desktop ]: value,
		} );
	};
	const handleOnChangeTablet = ( value ) => {
		onChange( {
			...values,
			[ responsive.tablet ]: value,
		} );
	};
	const handleOnChangeMobile = ( value ) => {
		onChange( {
			...values,
			[ responsive.mobile ]: value,
		} );
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
