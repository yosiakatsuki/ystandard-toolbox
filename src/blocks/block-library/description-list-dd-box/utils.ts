import classnames from 'classnames';
/**
 * WordPress Dependencies.
 */
import {
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
import type { DdBoxBlockAttributes } from './types';

export function getDdBoxBlockClasses( attributes: DdBoxBlockAttributes ) {
	const {
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

	const backgroundColorClass =
		getColorClassName( 'background-color', backgroundColor ) || '';
	const textColorClass = getColorClassName( 'color', textColor ) || '';
	const gradientClass = getGradientClass( gradient ) || '';

	return classnames( 'ystdtb-dd-box', {
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

export function getDdBoxBlockStyles( attributes: DdBoxBlockAttributes ) {
	const {
		margin,
		responsiveMargin,
		padding,
		responsivePadding,
		customTextColor,
		customBackgroundColor,
		customGradient,
	} = attributes;

	const types = [ 'desktop', 'tablet', 'mobile' ] as const;
	const position = [ 'top', 'right', 'bottom', 'left' ] as const;

	// レスポンシブ指定のあるスタイルを生成.
	const responsiveStyles = types.reduce(
		( acc, type ) => {
			// margin.
			const _margin = responsiveMargin?.[ type ];
			position.forEach( ( pos ) => {
				const marginValue = _margin?.[ pos ];
				if ( marginValue ) {
					const customPropName = getResponsiveCustomPropName(
						'ystdtb',
						`dd-simple--margin-${ pos }`,
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
						`dd-simple--padding-${ pos }`,
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
		color: customTextColor,
		background: customGradient || customBackgroundColor || undefined,
		...getCustomSpacingValues( margin, 'margin' ),
		...getCustomSpacingValues( padding, 'padding' ),
		...responsiveStyles,
	};
}
