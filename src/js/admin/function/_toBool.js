export default function _toBool(value) {
	if (true === value || 'true' === value || 1 === value || '1' === value) {
		return true;
	}
	return false;
}
