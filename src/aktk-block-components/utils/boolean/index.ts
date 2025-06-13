/**
 * Convert value to boolean
 * @param value - The value to convert
 * @returns boolean value
 */
export const toBool = (value: unknown): boolean => {
	return (
		true === value ||
		'true' === value ||
		1 === value ||
		'1' === value
	);
};