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
