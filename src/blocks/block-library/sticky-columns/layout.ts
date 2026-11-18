/* Plugin Dependencies */
import type { StickyColumnsAttributes } from './types';

export const CONTAINER_UNITS = [ 'px', 'em', 'rem', 'ch', 'vw', 'vh' ].map(
	( value ) => ( { value, label: value } )
);

/**
 * CSSへ出力できる長さに限定する。PHP側も同じ単位を受け付ける。
 * @param value 境界の入力値。
 */
export function getContainerSize( value?: string ) {
	return typeof value === 'string' &&
		/^(?:\d+(?:\.\d+)?|\.\d+)(?:px|em|rem|ch|vw|vh)$/.test( value )
		? value
		: undefined;
}

/**
 * 両画面で同じ境界を識別し、同値のブロックにルールを共有する。
 * @param props 親の設定。
 */
export function getLayoutKey( props: StickyColumnsAttributes ) {
	const { collapseAt, containerSize } = props;
	if ( collapseAt === 'container' ) {
		return getContainerSize( containerSize );
	}
	return collapseAt === 'tablet' ? 'tablet' : 'mobile';
}

/**
 * PHPが用意した編集用のクエリへ、検証済みの境界値を適用する。
 * @param key      検証済みの条件。
 * @param template PHPが生成した条件付きCSS。
 */
export function getEditorContainerCSS( key?: string, template?: string ) {
	// 未入力時は基本の1列表示、端末条件はPHPの共通CSSを使う。
	if ( ! key || key === 'mobile' || key === 'tablet' || ! template ) {
		return '';
	}
	return template.split( 'CONTAINER_SIZE' ).join( key );
}
