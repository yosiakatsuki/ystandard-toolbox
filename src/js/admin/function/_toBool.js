export default function _toBool( value ) {
	if ( true === value || 'true' === value ) {
		return true;
	}
	return false;
}
