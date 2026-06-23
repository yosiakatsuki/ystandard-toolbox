/**
 * UnitControl 等から受け取ったサイズ値を正規化する。
 *
 * - 空値（undefined / null / 空文字列）→ undefined
 * - 数値部分が 0（'0' / '0px' / '0em' / '0rem' / 数値の 0 等）→ '0'（単位なし）
 * - 数値化できない値（'auto' / 'calc(...)' 等）→ そのまま文字列で返す
 * - その他 → 文字列として返す
 *
 * @param value - 正規化対象の値
 * @return 正規化後の値
 */
export const normalizeSizeValue = (
	value: string | number | null | undefined
): string | undefined => {
	if ( value === undefined || value === null || value === '' ) {
		return undefined;
	}
	const strValue = String( value );
	return parseFloat( strValue ) === 0 ? '0' : strValue;
};

/**
 * サイズ値が border として CSS 上に表示される太さを持つかを判定する。
 *
 * - 空値（undefined / null / 空文字列 / 数値の 0）→ false
 * - 数値部分が 0（'0' / '0px' / '0em' 等）→ false（枠線として描画されない）
 * - 0 でない数値（'1px' / '0.5em' / 数値の 10 等、正負問わず）→ true
 * - 数値化できない文字列（'auto' / 'calc(...)' 等）→ true（計算結果は呼び出し側で判断）
 *
 * @param value - 判定対象の値
 * @return border として描画されうるかどうか
 */
export const hasBorderWidth = (
	value: string | number | null | undefined
): boolean => {
	if ( ! value ) return false;
	return parseFloat( String( value ) ) !== 0;
};
