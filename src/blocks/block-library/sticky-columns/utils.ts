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

/**
 * 追従に使う長さだけを親のCSS変数へ渡す。未設定の既存ブロックは従来のHTMLで保存する。
 * @param attributes 親ブロックの設定。
 */
export function getStickyOffsetStyle( attributes: StickyColumnsAttributes ) {
	const offset = attributes.style?.ystdtb?.stickyColumns?.stickyOffset;
	// 単位入力が扱う非負の長さと単位なしの0だけをCSSへ出力する。
	if (
		typeof offset === 'string' &&
		/^(?:0|(?:\d+(?:\.\d+)?|\.\d+)(?:px|em|rem))$/.test( offset )
	) {
		return { '--ystdtb--columns--sticky-offset': offset };
	}
	return undefined;
}
