/**
 * 値を数値型に変換する
 * @param value        - 変換する値
 * @param defaultValue - 変換できない場合のデフォルト値
 * @return 数値またはデフォルト値
 */
export const toNumber = (
	value: unknown,
	defaultValue?: number
): number | undefined => {
	const newValue = parseFloat( String( value ) );
	if ( Number.isNaN( newValue ) ) {
		return defaultValue;
	}
	return newValue;
};

/**
 * 値を整数型に変換する
 * @param value        - 変換する値
 * @param defaultValue - 変換できない場合のデフォルト値
 * @return 整数またはデフォルト値
 */
export const toInt = (
	value: unknown,
	defaultValue?: number
): number | undefined => {
	const newValue = parseInt( String( value ), 10 );
	if ( Number.isNaN( newValue ) ) {
		return defaultValue;
	}
	return newValue;
};
