import classnames from 'classnames';

/**
 * WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Block Dependencies.
 */
import type { IconListAttributes } from './types';

/**
 * ブロッククラス名
 */
export const blockClassName = 'ystdtb-icon-list';

export function getBlockClasses( attributes: IconListAttributes ) {
	const { iconType, customIconClass, iconBold } = attributes;
	return classnames( blockClassName, `icon--${ iconType }`, {
		'is-bold': iconBold,
		// @ts-ignore
		[ customIconClass ]: !! customIconClass,
	} );
}

export function getBlockStyles( attributes: IconListAttributes ) {
	return {};
}
