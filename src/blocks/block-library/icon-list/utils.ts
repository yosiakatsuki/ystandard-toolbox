import classnames from 'classnames';

/**
 * WordPress Dependencies.
 */
import { getColorClassName } from '@wordpress/block-editor';

/**
 * Block Dependencies.
 */
import type { IconListAttributes } from './types';

/**
 * ブロッククラス名
 */
export const blockClassName = 'ystdtb-icon-list';

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

export function getBlockStyles( attributes: IconListAttributes ) {
	const { customIconColor, iconColor } = attributes;
	return {
		'--icon-font-color': iconColor ? undefined : customIconColor,
	};
}
