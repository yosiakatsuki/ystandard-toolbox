import { _x } from '@wordpress/i18n';
import BoxControl from "@ystdtb/components/box-control";
import ResponsiveTab, { tabType } from "@ystdtb/components/responsive-tab";
import { getComponentConfig } from "@ystdtb/helper/config";
import {
	responsiveKeys as responsive,
	getResponsiveProperty
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
	const valueDesktop = getResponsiveProperty( values, responsive.desktop );
	const valueTablet = getResponsiveProperty( values, responsive.tablet );
	const valueMobile = getResponsiveProperty( values, responsive.mobile );

	const handleOnChangeDesktop = ( nextValues ) => {
		onChange( {
			...values,
			[ responsive.desktop ]: getSpacing( nextValues ),
		} );
	};
	const handleOnChangeTablet = ( nextValues ) => {
		onChange( {
			...values,
			[ responsive.tablet ]: getSpacing( nextValues ),
		} );
	};
	const handleOnChangeMobile = ( nextValues ) => {
		onChange( {
			...values,
			[ responsive.mobile ]: getSpacing( nextValues ),
		} );
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
									label={ _x( 'デスクトップ', 'responsive-margin', 'ystandard-toolbox' ) }
									values={ valueDesktop }
									onChange={ handleOnChangeDesktop }
									units={ _units }
								/>
							) }
							{ ( tabType.tablet === tab.name &&
								<BoxControl
									label={ _x( 'タブレット', 'responsive-margin', 'ystandard-toolbox' ) }
									values={ valueTablet }
									onChange={ handleOnChangeTablet }
									units={ _units }
								/>
							) }
							{ ( tabType.mobile === tab.name &&
								<BoxControl
									label={ _x( 'モバイル', 'responsive-margin', 'ystandard-toolbox' ) }
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
