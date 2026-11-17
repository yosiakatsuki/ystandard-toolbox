import classnames from 'classnames';

/* Plugin Dependencies */
import type { StickyColumnsAttributes } from './types';

/**
 * 表示順と追従対象を、編集・保存で共通の親クラスへ反映する。
 * @param attributes 親ブロックの設定。
 */
export function getStickyColumnsClasses( attributes: StickyColumnsAttributes ) {
	return classnames( 'ystdtb-sticky-columns', {
		'is-reversed': attributes.reverse,
		'has-sticky-first': attributes.stickyColumn === 'first',
		'has-sticky-second': attributes.stickyColumn === 'second',
	} );
}
