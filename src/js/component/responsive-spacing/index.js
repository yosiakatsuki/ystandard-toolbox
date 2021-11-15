import { _x } from '@wordpress/i18n';
import BoxControl from "@ystdtb/components/box-control";
import ResponsiveTab, { tabType } from "@ystdtb/components/responsive-tab";
import { getComponentConfig } from "@ystdtb/helper/config";
import {
	responsiveKeys as responsive,
	getResponsiveValue, parseResponsiveValues
} from "@ystdtb/helper/responsive";
import { getSpacing } from "@ystdtb/helper/spacing";

const ResponsiveSpacing = ( props ) => {
	const {
		label,
		values,
		onChange,
		units,
	} = props;

	const _units = units ?? getComponentConfig( 'units' );
	const valueDesktop = getResponsiveValue( values, responsive.desktop );
	const valueTablet = getResponsiveValue( values, responsive.tablet );
	const valueMobile = getResponsiveValue( values, responsive.mobile );

	const handleOnChangeDesktop = ( nextValues ) => {
		onChange( parseResponsiveValues( {
			...values,
			[ responsive.desktop ]: getSpacing( nextValues ),
		} ) );
	};
	const handleOnChangeTablet = ( nextValues ) => {
		onChange( parseResponsiveValues( {
			...values,
			[ responsive.tablet ]: getSpacing( nextValues ),
		} ) );
	};
	const handleOnChangeMobile = ( nextValues ) => {
		onChange( parseResponsiveValues( {
			...values,
			[ responsive.mobile ]: getSpacing( nextValues ),
		} ) );
	};

	return (
		<>
			<ResponsiveTab
				label={ label }
			>
				{ ( tab ) => {
					return (
						<>
							{ ( tabType.desktop === tab.name &&
								<BoxControl
									label={ _x( 'デスクトップ', 'responsive-component', 'ystandard-toolbox' ) }
									values={ valueDesktop }
									onChange={ handleOnChangeDesktop }
									units={ _units }
								/>
							) }
							{ ( tabType.tablet === tab.name &&
								<BoxControl
									label={ _x( 'タブレット', 'responsive-component', 'ystandard-toolbox' ) }
									values={ valueTablet }
									onChange={ handleOnChangeTablet }
									units={ _units }
								/>
							) }
							{ ( tabType.mobile === tab.name &&
								<BoxControl
									label={ _x( 'モバイル', 'responsive-component', 'ystandard-toolbox' ) }
									values={ valueMobile }
									onChange={ handleOnChangeMobile }
									units={ _units }
								/>
							) }
						</>
					);
				} }
			</ResponsiveTab>
		</>
	);
};

export default ResponsiveSpacing;
