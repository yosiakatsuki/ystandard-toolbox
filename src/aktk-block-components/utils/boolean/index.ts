/**
 * 値をboolean型に変換する
 * @param value - 変換する値
 * @returns boolean値
 */
export const toBool = (value: unknown): boolean => {
	return (
		true === value ||
		'true' === value ||
		1 === value ||
		'1' === value
	);
};