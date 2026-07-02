import classnames from 'classnames';

/**
 * WordPress Dependencies.
 */
import { getColorClassName } from '@wordpress/block-editor';

/**
 * Aktk Dependencies.
 */
import { presetTokenToCssVar } from '@aktk/block-components/utils/style-engine';
import { getResponsiveCustomPropName } from '@aktk/block-components/utils/responsive-value';

/**
 * Block Dependencies.
 */
import type { IconListAttributes } from './types';

/**
 * ブロッククラス名
 */
export const blockClassName = 'ystdtb-icon-list';

const responsiveSpacingTypes = [ 'desktop', 'tablet', 'mobile' ] as const;
const responsiveMarginPositions = [ 'top', 'bottom' ] as const;
const responsivePaddingPositions = [
	'top',
	'right',
	'bottom',
	'left',
] as const;

type ResponsiveSpacingPosition = 'top' | 'right' | 'bottom' | 'left';
type ResponsiveSpacingType = 'margin' | 'padding';

export function getBlockClasses( attributes: IconListAttributes ) {
	const { iconType, customIconClass, iconBold, iconColor, customIconColor } =
		attributes;
	const iconColorClass =
		getColorClassName( 'icon-font-color', iconColor ) || '';
	return classnames( blockClassName, `icon--${ iconType }`, {
		'is-bold': iconBold,
		// @ts-ignore
		[ customIconClass ]: !! customIconClass,
		[ iconColorClass ]: iconColorClass,
		'has-icon-font-color': iconColor || customIconColor,
	} );
}

/**
 * レスポンシブ余白用のカスタムプロパティを取得.
 */
function getResponsiveSpacingStyles(
	spacing: IconListAttributes['responsiveMargin'],
	spacingType: ResponsiveSpacingType,
	positions: readonly ResponsiveSpacingPosition[]
) {
	return responsiveSpacingTypes.reduce(
		( acc, responsiveType ) => {
			const value = spacing?.[ responsiveType ];

			positions.forEach( ( position ) => {
				const spacingValue = value?.[ position ];
				if ( spacingValue ) {
					const customPropName = getResponsiveCustomPropName(
						'ystdtb',
						`icon-list--${ spacingType }-${ position }`,
						responsiveType
					);
					acc[ customPropName ] =
						presetTokenToCssVar( spacingValue ) || spacingValue;
				}
			} );

			return acc;
		},
		{} as Record< string, string >
	);
}

export function getBlockStyles( attributes: IconListAttributes ) {
	const { customIconColor, iconColor, responsiveMargin, responsivePadding } =
		attributes;
	return {
		'--icon-font-color': iconColor ? undefined : customIconColor,
		...getResponsiveSpacingStyles(
			responsiveMargin,
			'margin',
			responsiveMarginPositions
		),
		...getResponsiveSpacingStyles(
			responsivePadding,
			'padding',
			responsivePaddingPositions
		),
	};
}
