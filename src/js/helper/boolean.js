/**
 * @deprecated Use toBool from '@aktk/block-components/utils/boolean' instead
 */
export const toBool = ( value ) => {
	return true === value || 'true' === value || 1 === value || '1' === value;
};
