import classnames from 'classnames';
import { __ } from '@wordpress/i18n';

/**
 * ブロッククラス名
 */
export const blockClassName = 'ystdtb-icon-list';

export function getBlockClasses( attributes ) {
	return classnames( blockClassName );
}

export function getBlockStyles( attributes ) {
	return {};
}
