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

const responsiveMarginTypes = [ 'desktop', 'tablet', 'mobile' ] as const;
const responsiveMarginPositions = [ 'top', 'bottom' ] as const;

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
 * レスポンシブmargin用のカスタムプロパティを取得.
 */
function getResponsiveMarginStyles( attributes: IconListAttributes ) {
	const { responsiveMargin } = attributes;

	return responsiveMarginTypes.reduce(
		( acc, type ) => {
			const margin = responsiveMargin?.[ type ];

			responsiveMarginPositions.forEach( ( position ) => {
				const value = margin?.[ position ];
				if ( value ) {
					const customPropName = getResponsiveCustomPropName(
						'ystdtb',
						`icon-list--margin-${ position }`,
						type
					);
					acc[ customPropName ] =
						presetTokenToCssVar( value ) || value;
				}
			} );

			return acc;
		},
		{} as Record< string, string >
	);
}

export function getBlockStyles( attributes: IconListAttributes ) {
	const { customIconColor, iconColor } = attributes;
	return {
		'--icon-font-color': iconColor ? undefined : customIconColor,
		...getResponsiveMarginStyles( attributes ),
	};
}
