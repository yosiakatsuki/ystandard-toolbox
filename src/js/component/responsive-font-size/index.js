import { _x } from '@wordpress/i18n';
import { FontSizePicker } from '@wordpress/block-editor';
import UnitControl from "@ystdtb/components/unit-control";
import ResponsiveTab, { tabType } from "@ystdtb/components/responsive-tab";
import {
	responsiveKeys as responsive,
	getResponsiveProperty
} from "@ystdtb/helper/responsive";
import { getComponentConfig } from "@ystdtb/helper/config";
import { createFontSizeObject, getFontSizes, getFontSizeValue } from "@ystdtb/helper/fontSize";

const ResponsiveFontSize = ( props ) => {
	const {
		label,
		values,
		onChange,
		units,
	} = props;

	const fontSizes = getFontSizes();

	const _units = units ?? getComponentConfig( 'fontSizeUnits' );
	const valueDesktop = getFontSizeValue(
		getResponsiveProperty( values, responsive.desktop ),
		fontSizes
	);
	const valueTablet = getResponsiveProperty( values, responsive.tablet );
	const valueMobile = getResponsiveProperty( values, responsive.mobile );

	const handleOnChangeDesktop = ( value ) => {
		onChange( {
			...values,
			[ responsive.desktop ]: createFontSizeObject( value, fontSizes ),
		} );
	};
	const handleOnChangeTablet = ( value ) => {
		console.log( {
			handleOnChangeTablet: value,
		} )
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
		<>
			<ResponsiveTab
				label={ label }
			>
				{ ( tab ) => {
					return (
						<>
							{ ( tabType.desktop === tab.name &&
								<FontSizePicker
									label={ _x( 'デスクトップ', 'responsive-component', 'ystandard-toolbox' ) }
									value={ valueDesktop }
									onChange={ handleOnChangeDesktop }
								/>
							) }
							{ ( tabType.tablet === tab.name &&
								<UnitControl
									className={ 'ystdtb-responsive-font-size-unit-control' }
									label={ _x( 'タブレット', 'responsive-component', 'ystandard-toolbox' ) }
									value={ valueTablet }
									onChange={ handleOnChangeTablet }
									units={ _units }
								/>
							) }
							{ ( tabType.mobile === tab.name &&
								<UnitControl
									className={ 'ystdtb-responsive-font-size-unit-control' }
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
		</>
	);
}
export default ResponsiveFontSize;