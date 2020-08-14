export default function _getColorStyle(type, color) {
	const result = {};
	const newColor = '' === color ? undefined : color;

	if ('background' === type) {
		result.backgroundColor = newColor;
	}
	if ('color' === type) {
		result.color = newColor;
	}
	if ('borderColor' === type) {
		result.borderColor = newColor;
	}
	if ('borderTopColor' === type) {
		result.borderTopColor = newColor;
	}
	if ('borderRightColor' === type) {
		result.borderRightColor = newColor;
	}
	if ('borderBottomColor' === type) {
		result.borderBottomColor = newColor;
	}
	if ('borderLeftColor' === type) {
		result.borderLeftColor = newColor;
	}
	return result;
}
