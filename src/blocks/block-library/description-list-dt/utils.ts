import classnames from 'classnames';
/**
 * WordPress Dependencies.
 */
import {
	getFontSizeClass,
	getColorClassName,
	// @ts-ignore.
	__experimentalGetGradientClass as getGradientClass,
} from '@wordpress/block-editor';
/**
 * Aktk Dependencies.
 */
import { getCustomSpacingValues } from '@aktk/block-components/components/custom-spacing-select';
import { presetTokenToCssVar } from '@aktk/block-components/utils/style-engine';
import { getResponsiveCustomPropName } from '@aktk/block-components/utils/responsive-value';

/**
 * Block Dependencies.
 */
import type { DtBlockAttributes } from './types';

export function getDtBlockClasses( attributes: DtBlockAttributes ) {
	const {
		textSize,
		customTextSize,
		responsiveTextSize,
		backgroundColor,
		customBackgroundColor,
		textColor,
		customTextColor,
		gradient,
		customGradient,
		margin,
		responsiveMargin,
		padding,
		responsivePadding,
	} = attributes;

	const fontSizeClass = getFontSizeClass( textSize || '' );
	const backgroundColorClass =
		getColorClassName( 'background-color', backgroundColor ) || '';
	const textColorClass = getColorClassName( 'color', textColor ) || '';
	const gradientClass = getGradientClass( gradient ) || '';

	return classnames( 'ystdtb-dt', {
		'has-font-size': fontSizeClass || customTextSize || responsiveTextSize,
		[ fontSizeClass ]: fontSizeClass,
		'has-background':
			backgroundColorClass ||
			customBackgroundColor ||
			gradient ||
			customGradient,
		[ backgroundColorClass ]: backgroundColorClass,
		'has-text-color': textColorClass || customTextColor,
		[ textColorClass ]: textColorClass,
		'has-background-gradient': gradientClass || customGradient,
		[ gradientClass ]: gradientClass,
		'has-padding': padding || responsivePadding,
		'has-margin': margin || responsiveMargin,
	} );
}

export function getDtBlockStyles( attributes: DtBlockAttributes ) {
	const {
		margin,
		responsiveMargin,
		padding,
		responsivePadding,
		textSize,
		customTextSize,
		responsiveTextSize,
		customTextColor,
		customBackgroundColor,
		customGradient,
		fontWeight,
		fontStyle,
		lineHeight,
		letterSpacing,
	} = attributes;

	const types = [ 'desktop', 'tablet', 'mobile' ] as const;
	const position = [ 'top', 'right', 'bottom', 'left' ] as const;

	// カスタムフォントサイズが有効かどうか.
	let hasCustomFontSize = ! textSize && !! customTextSize;

	// レスポンシブ指定のあるスタイルを生成.
	const responsiveStyles = types.reduce(
		( acc, type ) => {
			const _fontSize = responsiveTextSize?.[ type ];
			if ( _fontSize && ! textSize ) {
				acc[
					getResponsiveCustomPropName(
						'ystdtb',
						'dt--font-size',
						type
					)
				] = _fontSize;
				hasCustomFontSize = false;
			}
			// margin.
			const _margin = responsiveMargin?.[ type ];
			position.forEach( ( pos ) => {
				const marginValue = _margin?.[ pos ];
				if ( marginValue ) {
					const customPropName = getResponsiveCustomPropName(
						'ystdtb',
						`dt--margin-${ pos }`,
						type
					);
					acc[ customPropName ] =
						presetTokenToCssVar( marginValue ) || marginValue;
				}
			} );
			// padding.
			const _padding = responsivePadding?.[ type ];
			position.forEach( ( pos ) => {
				const paddingValue = _padding?.[ pos ];
				if ( paddingValue ) {
					const customPropName = getResponsiveCustomPropName(
						'ystdtb',
						`dt--padding-${ pos }`,
						type
					);
					acc[ customPropName ] =
						presetTokenToCssVar( paddingValue ) || paddingValue;
				}
			} );

			return acc;
		},
		{} as Record< string, string >
	);

	return {
		fontSize: hasCustomFontSize ? customTextSize : undefined,
		color: customTextColor,
		fontWeight: fontWeight || undefined,
		fontStyle: fontStyle || undefined,
		lineHeight: lineHeight || undefined,
		letterSpacing: letterSpacing || undefined,
		background: customGradient || customBackgroundColor || undefined,
		...getCustomSpacingValues( margin, 'margin' ),
		...getCustomSpacingValues( padding, 'padding' ),
		...responsiveStyles,
	};
}
