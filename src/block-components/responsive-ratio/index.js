/**
 * WordPress
 */
import { _x } from '@wordpress/i18n';
/**
 * yStandard
 */
import {
	getResponsiveCustomProperties,
	getResponsiveValue,
	parseResponsiveValues,
	responsiveKeys as responsive,
} from '@aktk/helper/responsive';
import ResponsiveTab from '@aktk/components/responsive-tab';
import ResponsiveValuesInfo from '@aktk/components/responsive-values-info';
import RatioSizeSelector from '@aktk/components/ratio-size-selector';
import './_editor.scss';

const ResponsiveRatio = ( { label, values, onChange } ) => {
	const handleOnChangeDesktop = ( newValue ) => {
		onChange(
			parseResponsiveValues( {
				...values,
				desktop: newValue || undefined,
			} )
		);
	};
	const handleOnChangeTablet = ( newValue ) => {
		onChange(
			parseResponsiveValues( {
				...values,
				tablet: newValue || undefined,
			} )
		);
	};
	const handleOnChangeMobile = ( newValue ) => {
		onChange(
			parseResponsiveValues( {
				...values,
				mobile: newValue || undefined,
			} )
		);
	};

	const ratioSizeSelectorProps = {
		[ responsive.desktop ]: {
			label: _x(
				'デスクトップ',
				'responsive-component',
				'ystandard-toolbox'
			),
			value: getResponsiveValue( values, responsive.desktop ),
			onChange: handleOnChangeDesktop,
		},
		[ responsive.tablet ]: {
			label: _x(
				'タブレット',
				'responsive-component',
				'ystandard-toolbox'
			),
			value: getResponsiveValue( values, responsive.tablet ),
			onChange: handleOnChangeTablet,
		},
		[ responsive.mobile ]: {
			label: _x(
				'モバイル',
				'responsive-component',
				'ystandard-toolbox'
			),
			value: getResponsiveValue( values, responsive.mobile ),
			onChange: handleOnChangeMobile,
		},
	};

	return (
		<>
			<ResponsiveTab label={ label }>
				{ ( tab ) => {
					return (
						<RatioSizeSelector
							className={
								'aktk-component-responsive-ratio-select'
							}
							{ ...ratioSizeSelectorProps[ tab.name ] }
						/>
					);
				} }
			</ResponsiveTab>
			<ResponsiveValuesInfo
				desktop={ ratioSizeSelectorProps[ responsive.desktop ].value }
				tablet={ ratioSizeSelectorProps[ responsive.tablet ].value }
				mobile={ ratioSizeSelectorProps[ responsive.mobile ].value }
			/>
		</>
	);
};

export default ResponsiveRatio;

export const getResponsiveRatioStyle = ( values, prefix = '' ) => {
	return getResponsiveCustomProperties(
		'aspectRatio',
		parseResponsiveValues( values ),
		prefix
	);
};
