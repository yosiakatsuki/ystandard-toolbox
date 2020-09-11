export default function _getNumberStep(unit) {
	if( 'em' === unit ) {
		return 0.1;
	}
	if( 'rem' === unit ) {
		return 0.1;
	}
	return 1;
}
